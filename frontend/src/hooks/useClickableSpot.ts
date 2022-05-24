import { useCallback, useContext } from "react";
import { GameContext, selectPiece } from "context/game";
import { Spot } from 'model'
import click from 'assets/click.wav';

function playClickSound() {
  new Audio(click).play();
}

export function useClickableSpot(spot: Spot) {
  const location = spot.getLocation();

  const { dispatch } = useContext(GameContext);
  return useCallback(() => { playClickSound(); dispatch(selectPiece(location)) },
  [dispatch, location]);
}
