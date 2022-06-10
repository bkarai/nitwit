import { useContext, useEffect } from "react";
import { GameContext } from "context/game";
import { PieceColor } from "model";
import { sendNotification, NotificationType } from "notifications";

export function useNetworkTurnNotification() {
  const { state: { currentTurn, userType, ready, winner } } = useContext(GameContext);

  useEffect(() => {
    if (ready && !winner && userType) {
      const isMyTurn = currentTurn === userType;
      isMyTurn ?
        sendNotification('It is your turn!', NotificationType.INFO) :
        sendNotification(`It is now ${userType === PieceColor.WHITE ? 'Black' : 'White'}'s' turn`, NotificationType.INFO);
    }
  }, [currentTurn, userType, ready, winner]);
};
