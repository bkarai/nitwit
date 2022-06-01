import { Box, Button, ContentWrapper, NewGameButton } from "components";
import { Instructions } from "pages/Instructions";
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <ContentWrapper boxProps={{ height: '100%' }}>
      <h1>Play Outwit</h1>
      <p className="lead mt-3">Outwit is a fun two-player strategy game that was originally released in 1975. I decided it would be a fun project to build a web version of the game. If you're interested in learning more about the game, <a href="https://boardgamegeek.com/boardgame/4696/outwit">this</a> is a good resource.</p>
      <Box mt={3} display='flex' justifyContent='center' gap="24px">
        <Link to={Instructions.path} style={{ width: '35%', maxWidth: '300px' }}>
          <Button style={{ width: '100%' }}>
              Learn how to play Outwit
          </Button>
        </Link>
        <NewGameButton buttonProps={{style: { width: '35%', maxWidth: '300px', alignSelf: 'center' }}}/>
      </Box>
    </ContentWrapper>
  );
}
