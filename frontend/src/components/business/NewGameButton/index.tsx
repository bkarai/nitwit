import { useCallback, useState } from 'react';
import { Button } from 'components';
import { createMatch } from 'api';

export function NewGameButton() {
  const [disabled, setDisabled] = useState(false);
  const handleClick = useCallback(() => {
    setDisabled(true);
    createMatch().then((response) => {
      window.location.href = `/game/${response.data.matchAccessKey}`
    }).finally(() => {
      setDisabled(false);
    });
  }, [setDisabled]);

  return (
    <Button disabled={disabled} onClick={handleClick}>New Game</Button>
  );
}
