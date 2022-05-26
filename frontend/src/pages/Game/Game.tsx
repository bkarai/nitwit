import { useEffect, useReducer, useContext, useCallback, useMemo } from 'react';

import { GameContext } from 'context/game';
import { setMatchAccessKey, finishTurn } from 'context/game';
import { LoadingScreen, GameBoard, ContentWrapper, WaitingForPlayer, GameStatus } from 'components';
import { initialState, rootReducer } from 'context/game/reducers';
import { useGameAccessKey, useTurnNotification, useSyncMatchToState, usePushMove, useSoundEffects } from 'hooks';
import { Board } from 'model';
import { EnhancedTimeline } from './EnhancedTimeline';

function Loading() {
  return (
    <ContentWrapper>
      <h1 className="display-2">
        Getting the game ready...
      </h1>
      <LoadingScreen />
    </ContentWrapper>
  );
}

function GameComponent() {
  const { state, dispatch } = useContext(GameContext);
  const { ready, userType, moveCount } = state;

  const gameAccessKey = useGameAccessKey();
  useEffect(() => {
    dispatch(setMatchAccessKey(gameAccessKey));
  }, [gameAccessKey, dispatch]);

  const afterPush = useCallback(() => {
    if (moveCount > 0) {
      dispatch(finishTurn());
    }
  }, [dispatch, moveCount]);

  useSoundEffects()
  useTurnNotification();
  useSyncMatchToState(gameAccessKey);
  usePushMove(afterPush);

  const isLoading = userType === null;

  return (
    <>
      <EnhancedTimeline />
      {isLoading ?
        <Loading /> :
        (
          <>
            {ready ?
            (
              <ContentWrapper>
                <GameStatus />
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
  const selectedPiece = useMemo(() => state.selectedPiece && board.getPiece(state.selectedPiece), [state.selectedPiece, board]);

  return (
    <GameContext.Provider value={{ state, dispatch, board, selectedPiece }}>
      <GameComponent />
    </GameContext.Provider>
  );
}
