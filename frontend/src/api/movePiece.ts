import axios from 'axios';
import { movePiecePath, AXIOS_CONFIG_POST } from './util';

export function movePiece(gameAccessKey: string, board: string) {
  return axios.post(movePiecePath(gameAccessKey), { positions: board }, AXIOS_CONFIG_POST);
};
