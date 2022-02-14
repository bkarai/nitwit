import axios from 'axios';
import { movePiecePath } from './util';

export function movePiece(matchAccessKey: string, board: string) {
  return axios.post(movePiecePath(matchAccessKey), { positions: board }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
};
