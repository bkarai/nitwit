import { NewNetworkGameButton, ContentWrapper } from 'components';
import { Button, Box } from '@mui/material';
import { LocalGame } from 'pages/LocalGame';
import { LOCAL_STORAGE_KEY } from 'utilities';
import { GroupOutlined, ArrowRightAlt } from '@mui/icons-material';

export function NewGameModalContent() {
  const localGame = localStorage.getItem(LOCAL_STORAGE_KEY);

  return (
    <ContentWrapper disablePadding boxProps={{ padding: 4, alignItems: 'center', height: '100%' }}>
      <h2>What type of game would you like to play?</h2>
      <Box height='100%' display='flex' justifyContent='center' alignItems='center'>
          {localGame && (
            <Button href={`${LocalGame.path}?continue=true`} size='large' sx={{ textTransform: 'none' }}>
              <Box height="60%" width="60%" display="flex" flexDirection='column'>
                <ArrowRightAlt sx={{ height: '100%', width: '100%' }}/>
                <Box>
                  Continue Local Game
                </Box>
              </Box>
            </Button>
          )}
          <Button href={LocalGame.path} size='large' sx={{ textTransform: 'none' }}>
            <Box height="60%" width="60%" display="flex" flexDirection='column'>
              <GroupOutlined sx={{ height: '100%', width: '100%' }}/>
              <Box>
                New Local Game
              </Box>
            </Box>
          </Button>
          <NewNetworkGameButton />
      </Box>
    </ContentWrapper>
  );
};
