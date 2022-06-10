import { useContext, useEffect } from 'react';
import { GameContext } from 'context/game';
import { LOCAL_STORAGE_KEY } from 'utilities';

function mergeToLocalStorage(o: object) {
  const currentState = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (currentState) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({...JSON.parse(currentState), ...o}));
  } else {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(o));
  }
}

export function useSaveGameToLocalStorage() {
  const { state: { currentTurn, winner }, board } = useContext(GameContext);

  useEffect(() => {
    console.log(board.apiSafeSerialize());
    mergeToLocalStorage({ board: board.apiSafeSerialize() });
  }, [board]);

  useEffect(() => {
    mergeToLocalStorage({ currentTurn });
  }, [currentTurn]);

  useEffect(() => {
    if (winner) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [winner]);
}
