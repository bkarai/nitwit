import styled from '@emotion/styled';
import { useEffect, useReducer, useContext } from 'react';

import { GameContext } from 'context';
import { movePiece } from 'api';
import { finishTurn } from 'actions';
import { LoadingScreen, Timeline, GameBoard, ContentWrapper, WaitingForPlayer } from 'components';
import { getTimelinePosition, sendNotification, NotificationType } from './util';
import { initialState, rootReducer } from 'reducers';
import { Board } from 'model';
import { useTurnNotification } from './useTurnNotification';
import { useMatchAccessKey } from 'hooks';
import { useSyncMatch } from './useSyncMatch';

export const LoadingWrapper = styled.div({
  marginTop: '20vh',
});

function GameComponent() {
  const matchAccessKey = useMatchAccessKey();
  const { state, dispatch } = useContext(GameContext);
  const { board, userMadeMove, ready, userType } = state;

  const gameBoard = new Board(board);
  const hasWinner = gameBoard.getWinner() !== null;

  useTurnNotification();
  useSyncMatch()

  const isLoading = userType === null;

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
