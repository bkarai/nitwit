import { useEffect, useRef } from 'react';

export function usePolling(
  callback: () => any,
  poll: boolean,
  pollTimeInSeconds: number,
) {

  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (poll) {
      timer.current = window.setInterval(callback, pollTimeInSeconds * 1000);
    } else {
      clearInterval(timer.current as number);
      timer.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poll]);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current as number);
      }
    };
  }, []);
}
