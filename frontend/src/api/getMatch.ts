import axios from 'axios';
import { matchPath, AXIOS_CONFIG_GET } from './util';

interface GetMatchResponse {
  isWhiteTurn: boolean;
  positions: string;
  ready: boolean;
  userType: 'black' | 'white';
  winner: null | 'black' | 'white';
};

export function getMatch(matchAccessKey: string) {
  return axios.get<GetMatchResponse>(matchPath(matchAccessKey), AXIOS_CONFIG_GET);
}
