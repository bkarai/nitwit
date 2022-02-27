import { useEffect } from 'react';
import { useGameReady } from 'hooks';
import { gameIsReady } from 'actions';

export function useDispatchGameReady(dispatch: any, matchAccessKey: string, pollSeconds: number = 5) {
  const [isLoading, isReady] = useGameReady(matchAccessKey, pollSeconds);

  useEffect(() => {
    dispatch(gameIsReady());
  }, [isReady, dispatch]);

  return { isLoading };
}
