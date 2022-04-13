import { useState, useCallback } from 'react';

import { usePolling } from 'hooks';
import { getMatch, GetMatchResponse } from 'api';

export function usePollForGameData(
  gameAccessKey: string,
  poll: boolean,
  pollTimeInSeconds: number,
): GetMatchResponse | null {
  const [gameData, setGameData] = useState<GetMatchResponse | null>(null);

  const pollForGameData = useCallback(() => {
    getMatch(gameAccessKey).then((response) => {
      setGameData({...response.data});
    });
  }, [gameAccessKey, setGameData]);

  usePolling(pollForGameData, poll, pollTimeInSeconds);
  return gameData;
}
