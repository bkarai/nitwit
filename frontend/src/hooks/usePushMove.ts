import { useContext, useEffect } from 'react';
import { movePiece } from 'api';
import { sendNotification, NotificationType } from 'notifications';
import { GameContext } from 'context/game';

export function usePushMove(afterFinish?: () => void) {
  const { state: { matchAccessKey, board, moveCount } } = useContext(GameContext);

  useEffect(() => {
    if (moveCount > 0 && matchAccessKey) {
      movePiece(matchAccessKey, board).then(() => {
        sendNotification('You made your move', NotificationType.SUCCESS);
        if (afterFinish) {
          afterFinish();
        }
      });
    }
  }, [moveCount, matchAccessKey, afterFinish, board]);
}
