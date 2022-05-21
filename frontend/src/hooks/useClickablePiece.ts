import { useCallback, useContext } from "react";
import { GameContext } from "context";
import { selectPiece } from "actions";

export function useClickablePiece(row: number, column: number) {
  const { dispatch } = useContext(GameContext);
  return useCallback(() => dispatch(selectPiece({ row, column })),
  [dispatch, row, column]);
}
