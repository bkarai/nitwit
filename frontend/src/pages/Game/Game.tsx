import styled from '@emotion/styled';
import { useEffect, useReducer, useContext } from 'react';

import { GameContext } from 'context';
import { movePiece } from 'api';
import { finishTurn } from 'actions';
import { LoadingScreen, Timeline, GameBoard, ContentWrapper, WaitingForPlayer } from 'components';
import { getTimelinePosition } from './util';
import { sendNotification, NotificationType } from 'notifications';
import { initialState, rootReducer } from 'reducers';
import { Board } from 'model';
import { useGameAccessKey, useTurnNotification, useSyncMatchToState } from 'hooks';

export const LoadingWrapper = styled.div({
  marginTop: '20vh',
});

function GameComponent() {
  const gameAccessKey = useGameAccessKey();
  const { state, dispatch } = useContext(GameContext);
  const { board, userMadeMove, ready, userType } = state;

  const gameBoard = new Board(board);
  const hasWinner = gameBoard.getWinner() !== null;

  useTurnNotification();
  useSyncMatchToState();

  const isLoading = userType === null;

  useEffect(() => {
    if (userMadeMove) {
      movePiece(gameAccessKey, gameBoard.serialize()).then(() => {
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
              <WaitingForPlayer/>
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
