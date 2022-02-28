import { useContext, useEffect } from "react";
import { GameContext } from "context";
import { PieceColor } from "model";
import { sendNotification, NotificationType } from "./util";

export function useTurnNotification() {
  const { state: { isWhiteTurn, userType, ready } } = useContext(GameContext);

  useEffect(() => {
    if (ready) {
      const isMyTurn = (isWhiteTurn && userType === PieceColor.WHITE) || (!isWhiteTurn && userType === PieceColor.BLACK);
      isMyTurn ?
        sendNotification('It is your turn!', NotificationType.INFO) :
        sendNotification(`It is now ${userType === PieceColor.WHITE ? 'Black' : 'White'}'s' turn`, NotificationType.INFO);
    }
  }, [isWhiteTurn, userType, ready]);
};
