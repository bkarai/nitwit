import styled from '@emotion/styled';
import { useEffect, useReducer, useContext } from 'react';

import { GameContext } from 'context';
import { movePiece } from 'api';
import { updateGameMeta, finishTurn } from 'actions';
import { usePollForGameData, useMatchAccessKey } from 'hooks';
import { LoadingScreen, Timeline, GameBoard, ContentWrapper, WaitingForPlayer } from 'components';
import { getTimelinePosition, sendNotification, NotificationType } from './util';
import { initialState, rootReducer } from 'reducers';
import { PieceColor, Board } from 'model';
import { useDispatchGameReady } from './useDispatchGameReady';
import { useTurnNotification } from './useTurnNotification';

export const LoadingWrapper = styled.div({
  marginTop: '20vh',
});

const WAIT_FOR_JOINER_POLL_SECONDS = 5;

function GameComponent() {
  const { state, dispatch } = useContext(GameContext);

  const { board, userMadeMove, ready, userType, isWhiteTurn } = state;
  const pollForGameData = (isWhiteTurn && userType === PieceColor.BLACK) || (!isWhiteTurn && userType === PieceColor.WHITE) || !userType;

  const gameBoard = new Board(board);
  const hasWinner = gameBoard.getWinner() !== null;

  const matchAccessKey = useMatchAccessKey();

  const { isLoading } = useDispatchGameReady(dispatch, matchAccessKey);
  const gameData = usePollForGameData(matchAccessKey, pollForGameData, WAIT_FOR_JOINER_POLL_SECONDS);

  useTurnNotification();

  useEffect(() => {
    if (gameData) {
      dispatch(updateGameMeta(gameData));
    }
  }, [JSON.stringify(gameData)]);

  useEffect(() => {
    if (userMadeMove) {
      movePiece(matchAccessKey, gameBoard.serialize()).then(() => {
        dispatch(finishTurn());
        sendNotification('You made your move', NotificationType.SUCCESS);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMadeMove]);

  return (
    <>
      <Timeline position={isLoading ? undefined : getTimelinePosition(hasWinner, ready)}/>
      {isLoading ?
        (<LoadingWrapper>
          <LoadingScreen />
        </LoadingWrapper>) :
        (
          <>
            {ready ?
            (
              <ContentWrapper>
                <GameBoard />
              </ContentWrapper>
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

function MapStateToPropsMock() {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <GameComponent />
    </GameContext.Provider>
  );
}

export const Game = MapStateToPropsMock;
