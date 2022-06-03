import { Box, Button, ContentWrapper, NewGameButton } from "components";
import { useIsMobile } from "hooks";
import { Instructions } from "pages/Instructions";
import { Link } from 'react-router-dom';

export function Home() {
  const isMobile = useIsMobile();
  
  return (
    <ContentWrapper boxProps={{ height: '100%' }}>
      <h1>Play Outwit</h1>
      <p className="lead mt-3">Outwit is a fun two-player strategy game that was originally released in 1975.<br />I decided it would be a fun project to build a web version of the game. If you're interested in learning more about the game, <a href="https://boardgamegeek.com/boardgame/4696/outwit" target="_blank">this</a> is a good resource.</p>
      <Box height={'50%'} maxHeight="50px" mt={4} display='flex' flexDirection={isMobile ? 'column' : 'row'} justifyContent='center' gap="24px" alignItems='center'>
        <Link to={Instructions.path} style={{ width: isMobile ? '75%' : '35%', maxWidth: '300px' }}>
          <Button style={{ width: '100%', height: '100%' }}>
              Learn how to play Outwit
          </Button>
        </Link>
        <NewGameButton buttonProps={{style: { width: isMobile ? '75%' : '35%', maxWidth: '300px' }}}/>
      </Box>
    </ContentWrapper>
  );
}
