import Button from 'react-bootstrap/Button';
import { createMatch } from 'api';

function onClickNewGameButton() {
  createMatch().then((response) => {
    window.location.href = `/game/${response.data.matchAccessKey}`
  });
}

export function NewGameButton() {
  return (
    <Button onClick={onClickNewGameButton}>New Game</Button>
  );
}
