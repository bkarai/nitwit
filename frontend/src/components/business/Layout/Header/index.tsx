import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import Button from 'react-bootstrap/Button';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { NewGameButton } from 'components';
import { Instructions } from 'pages/Instructions/Instructions';

export const Header = React.memo(function() {
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const handleClickHelp = useCallback(() => {
    setInstructionsOpen(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setInstructionsOpen(false);
  }, [setInstructionsOpen]);

  return (
    <>
      <Dialog
        open={instructionsOpen}
        onClose={handleCloseModal}
        maxWidth='md'
      >
        <Instructions />
      </Dialog>
      <Box component='nav' height="100%" width="100%" className="navbar navbar-light bg-light ps-3 pe-3" display="flex">
        <Tooltip title="Home" arrow>
          <Link className="navbar-brand" to="/">Outwit</Link>
        </Tooltip>
        <Tooltip title="Click here to learn how to play" arrow>
          <Button onClick={handleClickHelp}> 
            <Box>
              <InfoIcon/>
            </Box>
          </Button>
        </Tooltip>
        <NewGameButton />
      </Box>
    </>
  );
});
