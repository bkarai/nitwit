import { useState, useCallback } from 'react';

import { usePolling } from 'hooks';
import { State } from 'store';
import { getMatch } from 'api';

export function usePollForGameData(
  matchAccessKey: string,
  poll: boolean,
  pollTimeInMilliseconds: number,
): Pick<State, 'userType' | 'ready' | 'winner' | 'isWhiteTurn' | 'board'> {

  const [gameData, setGameData] = useState({});

  const pollForGameData = useCallback(() => {
    getMatch(matchAccessKey).then((response) => {
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
