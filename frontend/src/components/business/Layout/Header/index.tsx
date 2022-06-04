import React, { useState, useCallback, useEffect } from 'react';
import { Box, Button, Dialog, InfoIcon, Tooltip } from 'components'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NewGameButton } from 'components';
import { Instructions } from 'pages/Instructions';

export const Header = React.memo(function() {
  const [helpDisabled, setHelpDisabled] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickHelp = useCallback(() => {
    navigate('./#help');
  }, [navigate]);

  useEffect(() => {
    if (location.hash === '#help') {
      setInstructionsOpen(true);
    } else if (instructionsOpen) {
      setInstructionsOpen(false);
    }
  }, [location.hash, instructionsOpen, setInstructionsOpen]);

  useEffect(() => {
    if (location.pathname.startsWith(Instructions.path)) {
      setHelpDisabled(true);
    } else {
      setHelpDisabled(false);
    }
  }, [location.pathname]);

  const handleCloseModal = useCallback(() => {
    navigate('./');
  }, [navigate]);

  return (
    <>
      <Dialog
        open={instructionsOpen}
        onClose={handleCloseModal}
        maxWidth='md'
      >
        <Instructions.Component onClose={handleCloseModal}/>
      </Dialog>
      <Box component='nav' height="100%" width="100%" className="navbar navbar-light bg-light ps-3 pe-3" display="flex">
        <Tooltip title="Home" arrow enterDelay={500} enterNextDelay={2000}>
          <Link className="navbar-brand" to="/">Outwit</Link>
        </Tooltip>
        <Tooltip title="Click here to learn how to play" arrow enterDelay={500} enterNextDelay={2000}>
          <Button onClick={handleClickHelp} disabled={helpDisabled}> 
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
