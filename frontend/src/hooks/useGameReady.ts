import { useState, useCallback } from 'react';
import { usePolling } from 'hooks';
import { getMatch } from 'api';

// This is going to implement (possibly only part of) the main game loop.
// It will control the polling for the game data
// It will make the API call.
export function useGameReady(
  matchAccessKey: string,
  pollTimeInMilliseconds: number,
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

  usePolling(pollForGameReady, !isReady, pollTimeInMilliseconds);

  return [isLoading, isReady];
}
