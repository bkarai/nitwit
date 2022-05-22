import { useCallback, useContext } from "react";
import { GameContext } from "context/game";
import { selectPiece } from "context/game";

export function useClickablePiece(row: number, column: number) {
  const { dispatch } = useContext(GameContext);
  return useCallback(() => dispatch(selectPiece({ row, column })),
  [dispatch, row, column]);
}
