import { useCallback, useContext } from "react";
import { GameContext, selectPiece } from "context/game";
import { Spot } from 'model'

export function useClickableSpot(spot: Spot) {
  const location = spot.getLocation();

  const { dispatch } = useContext(GameContext);
  return useCallback(() => dispatch(selectPiece(location)),
  [dispatch, location]);
}
