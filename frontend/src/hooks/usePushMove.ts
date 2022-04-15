import { useEffect } from 'react';
import { movePiece } from 'api';
import { sendNotification, NotificationType } from 'notifications';

export function usePushMove(gameAccessKey: string, board: string, moveCount: number) {
  useEffect(() => {
    if (moveCount > 0) {
      movePiece(gameAccessKey, board).then(() => {
        sendNotification('You made your move', NotificationType.SUCCESS);
      });
    }
  }, [moveCount]);
}
