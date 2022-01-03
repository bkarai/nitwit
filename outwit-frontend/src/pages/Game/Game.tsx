import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';

import GameStatus from './GameStatus';
import WaitingForPlayer from './WaitingForPlayer';
import { State, Player } from 'store';

import { updateGameMeta, finishTurn } from 'actions';
import useGameReady from './UseGameReady';
import usePollForGameData from './UsePollForGameData';
import { API_PREFIX } from 'consts';
import { LoadingScreen, Timeline, GameBoard } from 'components';
import { LoadingWrapper } from './styles';
import { getTimelinePosition } from './GameStatus/util';

const WAIT_FOR_JOINER_POLL_SECONDS = 5;

type ParamTypes = {
  matchAccessKey: string,
};

function Game({
  dispatch,
  pollForGameData,
  board,
  userMadeMove,
  ready,
  winner,
  userType,
  isWhiteTurn,
}: {
  dispatch: any,
  pollForGameData: boolean,
  board: string,
  userMadeMove: boolean,
  ready: boolean,
  winner: boolean,
  userType: Player | null,
  isWhiteTurn: boolean;
}) {

  const { matchAccessKey } = useParams<ParamTypes>() as ParamTypes;

  const [isLoading, isReady] = useGameReady(matchAccessKey, WAIT_FOR_JOINER_POLL_SECONDS * 1000);
  const gameData = usePollForGameData(matchAccessKey, pollForGameData, WAIT_FOR_JOINER_POLL_SECONDS * 1000);

  useEffect(() => {
    dispatch(updateGameMeta({
      ready: isReady,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    if ((isWhiteTurn && userType === 'white') || (!isWhiteTurn && userType === 'black')) {
        toastr.info('It is your turn!');
    }
  }, [isWhiteTurn]);

  useEffect(() => {
    dispatch(updateGameMeta(gameData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData]);

  useEffect(() => {
    if (userMadeMove) {
      axios.post(`${API_PREFIX}/match/${matchAccessKey}/move`, { positions: board }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }).then((response) => {
        dispatch(finishTurn());
        toastr.success('You made your move', undefined, { newestOnTop: false });
        toastr.info(`It is now ${userType === 'white' ? 'Black' : 'White'}'s' turn`, undefined, { newestOnTop: false });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMadeMove]);

  return (
    <>
      <Timeline position={isLoading ? undefined : getTimelinePosition(winner, ready)}/>
      {isLoading ?
        (<LoadingWrapper>
          <LoadingScreen />
        </LoadingWrapper>) :
        (
          <>
            {isReady ? (
              <>
                <GameStatus />
                <GameBoard />
              </>
            ) : (
              <WaitingForPlayer matchAccessKey={matchAccessKey} />
            )
            }
          </>
        )
      }
  </>
  );
}

const mapStateToProps = (state: State) => ({
  pollForGameData: (state.isWhiteTurn && state.userType === 'black') || (!state.isWhiteTurn && state.userType === 'white') || !state.userType,
  board: state.board,
  userMadeMove: state.userMadeMove,
  ready: state.ready,
  winner: !!state.winner,
  userType: state.userType,
  isWhiteTurn: state.isWhiteTurn,
});

export default connect(mapStateToProps)(Game);
