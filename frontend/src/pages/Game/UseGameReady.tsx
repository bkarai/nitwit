import { useState, useCallback } from 'react';
import axios from 'axios';

import { API_PREFIX } from 'consts';
import { usePolling } from 'hooks';

// This is going to implement (possibly only part of) the main game loop.
// It will control the polling for the game data
// It will make the API call.

export default function useGameReady(
  matchAccessKey: string,
  pollTimeInMilliseconds: number,
) {

  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const pollForGameReady = useCallback(() => {
    axios.get(`${API_PREFIX}/match/${matchAccessKey}`).then((response) => {
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
