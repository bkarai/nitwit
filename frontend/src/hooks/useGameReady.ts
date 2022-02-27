import { useState, useCallback } from 'react';
import { usePolling } from 'hooks';
import { getMatch } from 'api';

// Determines if the game is ready.
// Really this is just checking if both users have joined.
// It will poll until the other user has joined.
export function useGameReady(
  matchAccessKey: string,
  pollTimeInSeconds: number,
) {

  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const pollForGameReady = useCallback(() => {
    getMatch(matchAccessKey).then((response) => {
      setIsLoading(false);

      const {
        ready
      } = response.data;

      setIsReady(ready);
    });
  }, [matchAccessKey, setIsLoading, setIsReady]);

  usePolling(pollForGameReady, !isReady, pollTimeInSeconds);
  return [isLoading, isReady];
}
