import { useReducer, useContext, useCallback, useMemo } from 'react';
import { GameContext } from 'context/game';
import { finishTurn } from 'context/game';
import { GameBoard, ContentWrapper, GameStatus, Box } from 'components';
import { initialStateLocal, rootReducer } from 'context/game/reducers';
import { useLocalTurnNotification, useSaveGameToLocalStorage, useSoundEffects, useIsMobile, useMoveEffect } from 'hooks';
import { Board } from 'model';

function LocalGameComponent() {
  const { state, dispatch } = useContext(GameContext);
  const { ready } = state;

  const handleFinishTurn = useCallback(() => {
    dispatch(finishTurn());
  }, [dispatch]);

  useSoundEffects()
  useLocalTurnNotification();
  useSaveGameToLocalStorage();
  useMoveEffect(handleFinishTurn);
  const isMobile = useIsMobile();

  return (
    <ContentWrapper boxProps={{ height: '100%' }} disablePadding={isMobile && ready}>
      <Box>
        <GameStatus />
        <GameBoard />
      </Box>
    </ContentWrapper>
  );
}

export function LocalGame() {
  const [state, dispatch] = useReducer(rootReducer, initialStateLocal);
  const board = useMemo(() => new Board(state.board), [state.board]);
  const selectedPiece = useMemo(() => state.selectedPiece && board.getPiece(state.selectedPiece), [state.selectedPiece, board]);

  return (
    <GameContext.Provider value={{ state, dispatch, board, selectedPiece }}>
      <LocalGameComponent />
    </GameContext.Provider>
  );
}
