import axios from 'axios';

import { API_PREFIX } from 'consts';

interface GetMatchResponse {
  isWhiteTurn: boolean;
  positions: string;
  ready: boolean;
  userType: 'black' | 'white';
  winner: null | 'black' | 'white';
};

export function getMatch(matchAccessKey: string) {
  return axios.get<GetMatchResponse>(`${API_PREFIX}/match/${matchAccessKey}`);
}
