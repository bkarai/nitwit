import { useState, useCallback } from 'react';
import axios from 'axios';

import { API_PREFIX } from 'consts';
import { usePolling } from 'hooks';
import { State } from 'store';

export function usePollForGameData(
  matchAccessKey: string,
  poll: boolean,
  pollTimeInMilliseconds: number,
): Pick<State, 'userType' | 'ready' | 'winner' | 'isWhiteTurn' | 'board'> {

  const [gameData, setGameData] = useState({});

  const pollForGameData = useCallback(() => {
    axios.get(`${API_PREFIX}/match/${matchAccessKey}`).then((response) => {
      setGameData({
        userType: response.data.userType,
        ready: response.data.ready,
        winner: response.data.winner,
        isWhiteTurn: response.data.isWhiteTurn,
        board: response.data.positions,
      });
    });
  }, [matchAccessKey, setGameData]);

  usePolling(pollForGameData, poll, pollTimeInMilliseconds);

  return gameData as Pick<State, 'userType' | 'ready' | 'winner' | 'isWhiteTurn' | 'board'>;
}
