import { useContext, useCallback } from 'react';
import { sendNotification, NotificationType } from 'notifications';
import { GameContext } from 'context/game';
import { LOCAL_STORAGE_KEY } from 'utilities';
import { useMoveEffect } from './useMoveEffect';

export function useSaveGameToLocalStorage() {
  const { state: { board, currentTurn } } = useContext(GameContext);

  const handleSave = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ board, currentTurn }));
    sendNotification('You made your move', NotificationType.SUCCESS);
  }, [board, currentTurn]);

  useMoveEffect(handleSave);
}
