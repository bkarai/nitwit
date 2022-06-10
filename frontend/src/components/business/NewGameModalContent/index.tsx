import { Button, NewNetworkGameButton, ContentWrapper } from 'components';
import { LocalGame } from 'pages/LocalGame';
import { LOCAL_STORAGE_KEY } from 'utilities';

export function NewGameModalContent() {
  const localGame = localStorage.getItem(LOCAL_STORAGE_KEY);

  return (
    <ContentWrapper disablePadding boxProps={{ padding: 4, alignItems: 'center' }}>
      <h1>What type of game would you like to play?</h1>
      {localGame && (
        <Button href={`${LocalGame.path}?continue=true`} style={{ width: '50%', marginTop: '16px' }}>
          Continue Local Game
        </Button>
      )}
      <Button href={LocalGame.path} style={{ width: '50%', marginTop: '16px' }}>
        Local Game
      </Button>
      <NewNetworkGameButton buttonProps={{ style: { width: '50%', marginTop: '16px' } }}/>
    </ContentWrapper>
  );
};
