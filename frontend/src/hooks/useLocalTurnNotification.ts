import { useContext, useEffect } from "react";
import { GameContext } from "context/game";
import { PieceColor } from "model";
import { sendNotification, NotificationType } from "notifications";

export function useLocalTurnNotification() {
  const { state: { currentTurn, winner } } = useContext(GameContext);

  useEffect(() => {
    if (!winner) {
      sendNotification(`It is now ${currentTurn === PieceColor.WHITE ? 'White' : 'Black'}'s' turn`, NotificationType.INFO);
    }
  }, [currentTurn, winner]);
};
