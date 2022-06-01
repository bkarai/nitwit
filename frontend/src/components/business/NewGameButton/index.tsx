import React, { useCallback, useState } from 'react';
import { Button } from 'components';
import { createMatch } from 'api';

interface NewGameButtonProps {
  buttonProps?: Partial<React.ComponentProps<typeof Button>>;
}

export function NewGameButton({
  buttonProps = {}
}: NewGameButtonProps) {
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
    <Button disabled={disabled} onClick={handleClick} {...buttonProps}>New Game</Button>
  );
}
