import React, { useState, useCallback, useEffect } from 'react';
import { Box, Button, Dialog, HelpOutlineIcon, Tooltip, NewGameModalContent } from 'components'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Instructions } from 'pages/Instructions';

export const Header = React.memo(function() {
  const [helpDisabled, setHelpDisabled] = useState(false);
  const [newGameOpen, setNewGameOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickHelp = useCallback(() => {
    navigate('./#help');
  }, [navigate]);

  const handleClickNewGame = useCallback(() => {
    navigate('./#new-game');
  }, [navigate]);

  useEffect(() => {
    if (location.hash === '#help') {
      setInstructionsOpen(true);
    } else if (instructionsOpen) {
      setInstructionsOpen(false);
    }
  }, [location.hash, instructionsOpen, setInstructionsOpen]);

  useEffect(() => {
    if (location.hash === '#new-game') {
      setNewGameOpen(true);
    } else if (newGameOpen) {
      setNewGameOpen(false);
    }
  }, [location.hash, setNewGameOpen, newGameOpen]);

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
      <Dialog
        open={newGameOpen}
        onClose={handleCloseModal}
        maxWidth='md'
        PaperProps={{
          sx: {
            height: '50%'
          }
        }}
      >
        <NewGameModalContent />
      </Dialog>
      <Box component='nav' height="100%" width="100%" className="navbar navbar-light bg-light ps-3 pe-3" display="flex">
        <Tooltip title="Home" arrow enterDelay={500} enterNextDelay={2000}>
          <Link className="navbar-brand" to="/">Nitwit</Link>
        </Tooltip>
        <Tooltip title="Click here to learn how to play" arrow enterDelay={500} enterNextDelay={2000}>
          <Button onClick={handleClickHelp} disabled={helpDisabled}> 
            <Box>
              <HelpOutlineIcon/>
            </Box>
          </Button>
        </Tooltip>
        <Button href='#new-game' onClick={handleClickNewGame}>Play Game...</Button>
      </Box>
    </>
  );
});
