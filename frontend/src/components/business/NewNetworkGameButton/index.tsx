import React, { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { createMatch } from 'api';
import { Box } from '@mui/material';
import { PublicOutlined } from '@mui/icons-material';

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
    <Button
      size='large'
      sx={{ textTransform: 'none' }}
      disabled={disabled}
      onClick={handleClick}
      {...buttonProps}
    >
      <Box height="60%" width="60%" display="flex" flexDirection='column'>
        <PublicOutlined sx={{ height: '100%', width: '100%' }}/>
        <Box>
          Online Game
        </Box>
      </Box>
    </Button>
  );
}
