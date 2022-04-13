import { useContext, useEffect } from "react";
import { GameContext } from "context";
import { PieceColor } from "model";
import { sendNotification, NotificationType } from "notifications";

export function useTurnNotification() {
  const { state: { currentTurn, userType, ready } } = useContext(GameContext);

  useEffect(() => {
    if (ready) {
      const isMyTurn = currentTurn === userType;
      isMyTurn ?
        sendNotification('It is your turn!', NotificationType.INFO) :
        sendNotification(`It is now ${userType === PieceColor.WHITE ? 'Black' : 'White'}'s' turn`, NotificationType.INFO);
    }
  }, [currentTurn, userType, ready]);
};
