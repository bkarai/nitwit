import Button from 'react-bootstrap/Button';

import { postMatch } from 'api';

function onClickNewGameButton() {
  postMatch().then((response) => {
    window.location.href = `/game/${response.data.matchAccessKey}`
  });
}

export function NewGameButton() {
  return (
    <Button onClick={onClickNewGameButton}>New Game</Button>
  );
}
