import styled from '@emotion/styled';
import { useEffect, useReducer, useContext } from 'react';

import { GameContext } from 'context';
import { movePiece } from 'api';
import { finishTurn } from 'actions';
import { LoadingScreen, GameBoard, ContentWrapper, WaitingForPlayer } from 'components';
import { sendNotification, NotificationType } from 'notifications';
import { initialState, rootReducer } from 'reducers';
import { useGameAccessKey, useTurnNotification, useSyncMatchToState } from 'hooks';
import { EnhancedTimeline } from './EnhancedTimeline';

export const LoadingWrapper = styled.div({
  marginTop: '20vh',
});

function GameComponent() {
  const gameAccessKey = useGameAccessKey();
  const { state, dispatch } = useContext(GameContext);
  const { board, userMadeMove, ready, userType } = state;

  useTurnNotification();
  useSyncMatchToState(gameAccessKey);

  const isLoading = userType === null;

  useEffect(() => {
    if (userMadeMove) {
      movePiece(gameAccessKey, board).then(() => {
        dispatch(finishTurn());
        sendNotification('You made your move', NotificationType.SUCCESS);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMadeMove]);

  return (
    <>
      <EnhancedTimeline />
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
