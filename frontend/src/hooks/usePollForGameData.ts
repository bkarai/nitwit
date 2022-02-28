import { useState, useCallback } from 'react';

import { usePolling } from 'hooks';
import { State } from 'store';
import { getMatch } from 'api';

type StateFields = Pick<State, 'userType' | 'ready' | 'isWhiteTurn' | 'board'>;

export function usePollForGameData(
  gameAccessKey: string,
  poll: boolean,
  pollTimeInSeconds: number,
): StateFields | null {
  const [gameData, setGameData] = useState<StateFields | null>(null);

  const pollForGameData = useCallback(() => {
    getMatch(gameAccessKey).then((response) => {
      setGameData({
        userType: response.data.userType,
        ready: response.data.ready,
        isWhiteTurn: response.data.isWhiteTurn,
        board: response.data.positions,
      });
    });
  }, [gameAccessKey, setGameData]);

  usePolling(pollForGameData, poll, pollTimeInSeconds);

  return gameData;
}
