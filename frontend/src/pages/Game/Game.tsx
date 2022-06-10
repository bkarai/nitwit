import { useEffect, useReducer, useContext, useCallback, useMemo } from 'react';

import { GameContext } from 'context/game';
import { setMatchAccessKey, finishTurn } from 'context/game';
import { LoadingScreen, GameBoard, ContentWrapper, WaitingForPlayer, GameStatus, Box } from 'components';
import { initialStateNetwork, rootReducer } from 'context/game/reducers';
import { useGameAccessKey, useNetworkTurnNotification, useSyncMatchToState, usePushMove, useSoundEffects, useIsMobile } from 'hooks';
import { Board } from 'model';
import { EnhancedTimeline } from './EnhancedTimeline';

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
  useNetworkTurnNotification();
  useSyncMatchToState(gameAccessKey);
  usePushMove(afterPush);
  const isMobile = useIsMobile();
  const isLoading = userType === null;

  return (
    <>
      {!isMobile && <EnhancedTimeline />}
      <ContentWrapper boxProps={{ height: '100%' }} disablePadding={isMobile && ready}>
        {isLoading ?
          <LoadingScreen message="Getting your game ready..."/> :
          (
            <>
              {ready ?
              (
                <Box>
                  <GameStatus />
                  <GameBoard />
                </Box>
              ) : (
                <WaitingForPlayer/>
              )
              }
            </>
          )
        }
        </ContentWrapper>
  </>
  );
}

export function Game() {
  const [state, dispatch] = useReducer(rootReducer, initialStateNetwork);
  const board = useMemo(() => new Board(state.board), [state.board]);
  const selectedPiece = useMemo(() => state.selectedPiece && board.getPiece(state.selectedPiece), [state.selectedPiece, board]);

  return (
    <GameContext.Provider value={{ state, dispatch, board, selectedPiece }}>
      <GameComponent />
    </GameContext.Provider>
  );
}
