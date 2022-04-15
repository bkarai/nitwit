import styled from '@emotion/styled';
import { useEffect, useReducer, useContext } from 'react';

import { GameContext } from 'context';
import { movePiece } from 'api';
import { setMatchAccessKey } from 'actions';
import { LoadingScreen, GameBoard, ContentWrapper, WaitingForPlayer } from 'components';
import { sendNotification, NotificationType } from 'notifications';
import { initialState, rootReducer } from 'reducers';
import { useGameAccessKey, useTurnNotification, useSyncMatchToState, usePushMove } from 'hooks';
import { EnhancedTimeline } from './EnhancedTimeline';

export const LoadingWrapper = styled.div({
  marginTop: '20vh',
});

function GameComponent() {
  const { state, dispatch } = useContext(GameContext);
  const { board, ready, userType, moveCount } = state;

  const gameAccessKey = useGameAccessKey();
  useEffect(() => {
    dispatch(setMatchAccessKey(gameAccessKey));
  }, [gameAccessKey, dispatch]);

  useTurnNotification();
  useSyncMatchToState(gameAccessKey);
  usePushMove(gameAccessKey, board, moveCount);

  const isLoading = userType === null;

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

export function Game() {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <GameComponent />
    </GameContext.Provider>
  );
}
