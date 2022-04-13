import axios from 'axios';
import { matchPath, AXIOS_CONFIG_GET } from './util';
import { PieceColor } from 'model';

export interface GetMatchResponse {
  isWhiteTurn: boolean;
  positions: string;
  ready: boolean;
  userType: PieceColor;
  winner: null | PieceColor;
};

export function getMatch(gameAccessKey: string) {
  return axios.get<GetMatchResponse>(matchPath(gameAccessKey), AXIOS_CONFIG_GET);
}
