import React, { useCallback, useState } from 'react';
import { Button } from 'components';
import { createMatch } from 'api';

interface NewNetworkGameButtonProps {
  buttonProps?: Partial<React.ComponentProps<typeof Button>>;
}

export function NewNetworkGameButton({
  buttonProps = {}
}: NewNetworkGameButtonProps) {
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
    <Button disabled={disabled} onClick={handleClick} {...buttonProps}>Online Game</Button>
  );
}
