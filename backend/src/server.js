import { v4 as uuidv4 } from 'uuid';
import isValidPort from 'is-valid-port';
import mysql from 'mysql';
import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import cookieParser from 'cookie-parser';

import getWinner from './getWinner.js';

const DEFAULT_POSTIIONS = 'xxxxxxxxwb'
+ 'xxxxxxxwbx'
+ 'xxxxxxwbxx'
+ 'xxxxxwbxxx'
+ 'xxxxWBxxxx'
+ 'xxxwbxxxxx'
+ 'xxwbxxxxxx'
+ 'xwbxxxxxxx'
+ 'wbxxxxxxxx';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: { service: 'output-backend' },
  transports: [
    new winston.transports.Console(),
  ],
});

function logAndExitWithError(message) {
  logger.error(message);
  process.exit(1);
}

function logAndExitWithEnvironmentIssue(environmentVariable, givenValue) {
  logAndExitWithError(`Invalid value for ${environmentVariable} - given: ${givenValue}`);
}

// *** START Port configuration ***
const serverPort = parseInt(process.env.SERVER_PORT, 10);

if (!isValidPort(serverPort)) {
  logAndExitWithEnvironmentIssue('SERVER_PORT', serverPort);
}
// *** END Port configuration ***

// *** START MYSQL configuration ***
const DbHost = process.env.DB_HOST;
const DbUser = process.env.DB_USER;
const DbPassword = process.env.DB_PASSWORD;
const DbDatabase = process.env.DB_DATABASE;
const DbPort = parseInt(process.env.DB_PORT, 10);

if (!DbHost) {
  logAndExitWithEnvironmentIssue('DB_HOST', DbHost);
}

if (!DbUser) {
  logAndExitWithEnvironmentIssue('DB_USER', DbUser);
}

if (!DbPassword) {
  logAndExitWithEnvironmentIssue('DB_PASSWORD', DbPassword);
}

if (!DbDatabase) {
  logAndExitWithEnvironmentIssue('DB_DATABASE', DbDatabase);
}

if (!isValidPort(DbPort)) {
  logAndExitWithEnvironmentIssue('DB_PORT', DbPort);
}

const dbConnection = mysql.createConnection({
  host: DbHost,
  port: DbPort,
  user: DbUser,
  password: DbPassword,
  database: DbDatabase,
});

logger.info({
  message: 'Connecting to database',
});

dbConnection.connect((error) => {
  if (error) {
    logAndExitWithError(error.toString());
  }
  logger.info({
    message: 'Connection was successful',
  });
});
// *** END MYSQL configuration ***

// *** START Application ***
const app = express();
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const apiPrefix = '/api';

const expressLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
});

app.use(expressLogger);

app.post(`${apiPrefix}/match`, (req, res) => {
  dbConnection.query('INSERT INTO boards (positions, is_white_turn) VALUES (?, ?)', [DEFAULT_POSTIIONS, !!Math.round(Math.random())], (insertBoardError, insertBoardResults) => {
    if (insertBoardError) {
      res.status(500);
      res.json({ error: 'There was a problem processing your request. Sorry for the inconvenience' });
      logger.error(insertBoardError.message);
    } else {
      const boardId = insertBoardResults.insertId;
      const matchAccessKey = uuidv4();
      const whiteAccessKey = uuidv4();
      dbConnection.query('INSERT INTO matches (white_access_key, board_id, access_key) VALUES (?, ?, ?)', [whiteAccessKey, boardId, matchAccessKey], (insertMatchError) => {
        if (insertMatchError) {
          res.status(500);
          res.json({ error: 'There was a problem processing your request. Sorry for the inconvenience' });
          logger.error(insertMatchError.message);
        } else {
          res.status(201);
          res.cookie('playerAccessKey', whiteAccessKey, { maxAge: 86400000, httpOnly: true, path: `/api/match/${matchAccessKey}` });
          res.json({
            matchAccessKey,
          });
        }
      });
    }
  });
});

app.post(`${apiPrefix}/match/:matchAccessKey/join`, (req, res) => {
  const { matchAccessKey } = req.params;
  const { playerAccessKey } = req.cookies;

  dbConnection.query('SELECT id, white_access_key, black_access_key FROM matches WHERE access_key = ?', [matchAccessKey], (findMatchError, findMatchResults) => {
    if (findMatchError) {
      res.status(500);
      res.json({ error: 'There was a problem processing your request. Sorry for the inconvenience' });
      logger.error(findMatchError.message);
    } else if (findMatchResults.length !== 1) {
      res.status(401);
      res.json({ error: 'Could not find the requested match' });
    } else {
      const matchId = findMatchResults[0].id;
      const whiteAccessKey = findMatchResults[0].white_access_key;
      const retrievedBlackAccessKey = findMatchResults[0].black_access_key;

      if (playerAccessKey === retrievedBlackAccessKey) {
        res.status(200);
        res.json();
        return;
      }
      if (playerAccessKey === whiteAccessKey) {
        res.status(200);
        res.json();
        return;
      }
      if (retrievedBlackAccessKey) {
        res.status(400);
        res.json({ error: 'Sorry, the match already has two players' });
        return;
      }

      const blackAccessKey = uuidv4();
      dbConnection.query('UPDATE matches SET black_access_key = ? WHERE id = ?', [blackAccessKey, matchId], (updateMatchError, updateMatchResults) => {
        if (updateMatchError) {
          res.status(500);
          res.json({ error: 'There was a problem processing your request. Sorry for the inconvenience' });
          logger.error(updateMatchError.message);
        } else if (updateMatchResults.affectedRows !== 1) {
          res.status(500);
          res.json({ error: 'There was a problem processing your request. Sorry for the inconvenience' });
        } else {
          res.status(200);
          res.cookie('playerAccessKey', blackAccessKey, { maxAge: 86400000, httpOnly: true, path: `/api/match/${matchAccessKey}` });
          res.json();
        }
      });
    }
  });
});

app.post(`${apiPrefix}/match/:matchAccessKey/move`, (req, res) => {
  const { matchAccessKey } = req.params;
  const { positions } = req.body;
  const { playerAccessKey } = req.cookies;

  if (!positions) {
    res.status(400);
    res.json({ error: 'Body must include \'positions\' key' });
  } else {
    dbConnection.query('SELECT board_id, white_access_key, black_access_key FROM matches WHERE access_key = ?', [matchAccessKey], (findMatchError, findMatchResults) => {
      if (findMatchError) {
        res.status(500);
        res.json({ error: 'There was a problem processing your request. Sorry for the inconvenience' });
        logger.error(findMatchError.message);
      } else if (findMatchResults.length !== 1) {
        res.status(401);
        res.json({ error: 'Could not find the requested match' });
      } else {
        const boardId = findMatchResults[0].board_id;
        const whiteAccessKey = findMatchResults[0].white_access_key;
        const blackAccessKey = findMatchResults[0].black_access_key;
        const isPlayerWhite = playerAccessKey === whiteAccessKey;
        const isPlayerBlack = playerAccessKey === blackAccessKey;
        if (!isPlayerWhite && !isPlayerBlack) {
          res.status(401);
          res.json({ error: 'You are not allowed to access this match' });
        } else if (!blackAccessKey) {
          res.status(400);
          res.json({ error: 'The match has not started yet' });
        } else {
          dbConnection.query('SELECT is_white_turn, winner FROM boards WHERE id = ?', [boardId], (findBoardError, findBoardResults) => {
            if (findBoardError || (findBoardResults.length !== 1)) {
              res.status(500);
              res.json({ error: 'There was a problem processing your request. Sorry for the inconvenience' });
              if (findBoardError) {
                logger.error(findBoardError.message);
              }
            } else {
              const isWhiteTurn = findBoardResults[0].is_white_turn;
              const { winner } = findBoardResults[0];

              if (winner) {
                res.status(400);
                res.json({ error: 'Cannot process request since the game is already over' });
              } else if ((isPlayerWhite && !isWhiteTurn) || (!isPlayerWhite && isWhiteTurn)) {
                res.status(400);
                res.json({ error: 'It is not your turn to go' });
              } else {
                const newWinner = getWinner(positions);
                dbConnection.query('UPDATE boards SET winner = ?, is_white_turn = ?, positions = ? WHERE id = ?', [newWinner, !isWhiteTurn, positions, boardId], (updateBoardError) => {
                  if (updateBoardError) {
                    res.status(500);
                    res.json({ error: 'There was a problem processing your request. Sorry for the inconvenience' });
                    logger.error(updateBoardError.message);
                  } else {
                    res.status(200);
                    res.json();
                  }
                });
              }
            }
          });
        }
      }
    });
  }
});

app.get(`${apiPrefix}/match/:matchAccessKey`, (req, res) => {
  const { matchAccessKey } = req.params;
  const { playerAccessKey } = req.cookies;
  dbConnection.query('SELECT board_id, black_access_key, white_access_key FROM matches WHERE access_key = ?', [matchAccessKey], (findMatchError, findMatchResults) => {
    if (findMatchError) {
      res.status(500);
      res.json({ error: 'There was a problem processing your request. Sorry for the inconvenience' });
      logger.error(findMatchError.message);
    } else if (findMatchResults.length !== 1) {
      res.status(401);
      res.json({ error: 'Could not find the requested match' });
    } else {
      const boardId = findMatchResults[0].board_id;
      let userType = null;

      if (findMatchResults[0].white_access_key === playerAccessKey) {
        userType = 'white';
      } else if (findMatchResults[0].black_access_key === playerAccessKey) {
        userType = 'black';
      }

      dbConnection.query('SELECT positions, is_white_turn, winner FROM boards WHERE id = ?', [boardId], (findBoardError, findBoardResults) => {
        if (findBoardError) {
          res.status(500);
          res.json({ error: 'There was a problem processing your request. Sorry for the inconvenience' });
          logger.error(findBoardError.message);
        } else {
          res.status(200);
          res.json({
            positions: findBoardResults[0].positions,
            isWhiteTurn: !!findBoardResults[0].is_white_turn,
            winner: findBoardResults[0].winner,
            ready: !!findMatchResults[0].black_access_key,
            userType,
          });
        }
      });
    }
  });
});

app.listen(serverPort, () => {
  logger.info({
    message: `Listening for connections on port ${serverPort}`,
  });
});

// *** END Application ***

// *** START Redirect ***

const redirectPort = parseInt(process.env.REDIRECT_PORT, 10);

const redirect = express();
redirect.use(expressLogger);

redirect.get('*', (req, res) => {
  res.redirect(301, `https://play-nitwit.com${req.originalUrl}`);
});

redirect.listen(redirectPort, () => {
  logger.info({
    message: `Listening for connections on port ${redirectPort}`,
  });
});

// *** END Redirect ***
