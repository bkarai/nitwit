import axios from 'axios';
import { matchPath, AXIOS_CONFIG_GET } from './util';
import { PieceColor } from 'model';

interface GetMatchResponse {
  isWhiteTurn: boolean;
  positions: string;
  ready: boolean;
  userType: PieceColor;
  winner: null | PieceColor;
};

export function getMatch(matchAccessKey: string) {
  return axios.get<GetMatchResponse>(matchPath(matchAccessKey), AXIOS_CONFIG_GET);
}
