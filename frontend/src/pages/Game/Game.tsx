import styled from '@emotion/styled';
import { useEffect, useReducer, useContext, useCallback, useMemo } from 'react';

import { GameContext } from 'context/game';
import { setMatchAccessKey, finishTurn } from 'context/game';
import { LoadingScreen, GameBoard, ContentWrapper, WaitingForPlayer } from 'components';
import { initialState, rootReducer } from 'context/game/reducers';
import { useGameAccessKey, useTurnNotification, useSyncMatchToState, usePushMove } from 'hooks';
import { Board } from 'model';
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

  const afterPush = useCallback(() => {
    if (moveCount > 0) {
      dispatch(finishTurn());
    }
  }, [dispatch, moveCount])

  useTurnNotification();
  useSyncMatchToState(gameAccessKey);
  usePushMove(gameAccessKey, board, moveCount, afterPush);

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
  const board = useMemo(() => new Board(state.board), [state.board]);
  const selectedPiece = useMemo(() => state.selectedPiece && board.getPiece(state.selectedPiece), [state.selectedPiece]);

  return (
    <GameContext.Provider value={{ state, dispatch, board, selectedPiece }}>
      <GameComponent />
    </GameContext.Provider>
  );
}
