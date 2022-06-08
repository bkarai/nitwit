import { Button, NewNetworkGameButton, ContentWrapper } from 'components';

export function NewGameModalContent() {
  return (
    <ContentWrapper disablePadding boxProps={{ padding: 4, alignItems: 'center' }}>
      <h1>What type of game would you like to play?</h1>
      <Button style={{ width: '50%', marginTop: '16px' }}>
        Local Game
      </Button>
      <NewNetworkGameButton buttonProps={{ style: { width: '50%', marginTop: '16px' } }}/>
    </ContentWrapper>
  );
};
