
import { GameContext } from "context/game";
import { useContext, useEffect } from "react";

export function useMoveEffect(fn: () => void) {
  const { state: { moveCount } } = useContext(GameContext);

  useEffect(() => {
    if (moveCount > 0) {
      fn();
    }
  }, [moveCount, fn]);
}
