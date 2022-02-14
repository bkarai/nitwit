import axios from 'axios';
import { movePiecePath, AXIOS_CONFIG_POST } from './util';

export function movePiece(matchAccessKey: string, board: string) {
  return axios.post(movePiecePath(matchAccessKey), { positions: board }, AXIOS_CONFIG_POST);
};
