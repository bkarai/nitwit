import { useCallback } from "react";
import { Box, Button, ContentWrapper } from "components";
import { useIsMobile } from "hooks";
import { Instructions } from "pages/Instructions";
import { Link, useNavigate } from 'react-router-dom';

export function Home() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const handleClickNewGame = useCallback(() => {
    navigate('./#new-game');
  }, [navigate]);
  
  return (
    <ContentWrapper boxProps={{ height: '100%' }}>
      <h1>Play Nitwit</h1>
      <p className="lead mt-3">Nitwit is a fun two-player strategy game that is inspired by the game Outwit (1975).<br />I decided it would be a fun project to build an improved version of the original. If you're interested in learning more about the original game, <a href="https://boardgamegeek.com/boardgame/4696/outwit" target="_blank" rel="noreferrer">this</a> is a good resource.</p>
      <Box height={'50%'} maxHeight="50px" mt={4} display='flex' flexDirection={isMobile ? 'column' : 'row'} justifyContent='center' gap="24px" alignItems='center'>
        <Link to={Instructions.path} style={{ width: isMobile ? '75%' : '35%', maxWidth: '300px' }}>
          <Button style={{ width: '100%', height: '100%' }}>
              Learn how to play Nitwit
          </Button>
        </Link>
        <Button onClick={handleClickNewGame} style={{ width: isMobile ? '75%' : '35%', maxWidth: '300px' }}>New Game</Button>
      </Box>
      <Box mt={5}>
        <h3>Have you noticed a bug or would you like to make a suggestion for improvement?</h3>
        <a href="https://forms.gle/KfVZ1ACtS6eobWUKA" target="_blank" rel="noreferrer">Fill out the feedback form here</a>
      </Box>
    </ContentWrapper>
  );
}
