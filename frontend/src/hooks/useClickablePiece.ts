import { useCallback, useContext } from "react";
import { Coordinate } from "model";
import { GameContext } from "context";
import { selectPiece } from "actions";

export function useClickablePiece(coordinate: Coordinate) {
  const gameContext = useContext(GameContext);
  const { dispatch } = gameContext;
  return useCallback(() => dispatch(selectPiece(coordinate)),
  [dispatch, coordinate.row, coordinate.column]);
}
