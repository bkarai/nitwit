import { useReducer, useContext, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { GameContext } from 'context/game';
import { finishTurn } from 'context/game';
import { GameBoard, ContentWrapper, GameStatus, Box } from 'components';
import { initialStateLocal, rootReducer } from 'context/game/reducers';
import { useLocalTurnNotification, useSaveGameToLocalStorage, useSoundEffects, useIsMobile, useMoveEffect } from 'hooks';
import { Board } from 'model';
import { LOCAL_STORAGE_KEY } from 'utilities';

function LocalGameComponent() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GameContext);
  const { ready } = state;

  useEffect(() => {
    navigate('./?continue=true', { replace: true });
  }, []);

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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const continueLastGame = searchParams.get('continue');

  let initialState = initialStateLocal;
  if (continueLastGame) {
    const gameStateRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (gameStateRaw) {
      try {
        const { board, currentTurn } = JSON.parse(gameStateRaw);
        initialState = {...initialState, board, currentTurn};
      } catch {
        console.log('Encountered error while trying to parse previous game state');
      } 
    }
  }

  const [state, dispatch] = useReducer(rootReducer, initialState);
  const board = useMemo(() => new Board(state.board), [state.board]);
  const selectedPiece = useMemo(() => state.selectedPiece && board.getPiece(state.selectedPiece), [state.selectedPiece, board]);

  return (
    <GameContext.Provider value={{ state, dispatch, board, selectedPiece }}>
      <LocalGameComponent />
    </GameContext.Provider>
  );
}
