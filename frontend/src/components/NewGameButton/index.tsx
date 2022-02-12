import axios from 'axios';
import Button from 'react-bootstrap/Button';

import { API_PREFIX } from 'consts';

function postMatch() {
  axios.post(`${API_PREFIX}/match`, {},
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }).then((response) => {
    window.location.href = `/game/${response.data.matchAccessKey}`;
  });
}

export function NewGameButton() {
  return (
    <Button onClick={postMatch}>New Game</Button>
  );
}
