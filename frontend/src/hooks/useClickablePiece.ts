import { useCallback, useContext } from "react";
import { Coordinate } from "model";
import { GameContext } from "context";
import { selectPiece } from "actions";

export function useClickablePiece(coordinate: Coordinate) {
  const { dispatch } = useContext(GameContext);
  return useCallback(() => dispatch(selectPiece(coordinate)),
  [dispatch, coordinate.row, coordinate.column]);
}
