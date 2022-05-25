import { GameContext } from "context/game";
import { useContext, useEffect } from "react";

export function useClickEffect(fn: () => void) {
  const { selectedPiece } = useContext(GameContext);
  const isPieceSelected = selectedPiece !== null;

  useEffect(() => {
    if (isPieceSelected) {
      fn();
    }
  }, [isPieceSelected, fn]);
}
