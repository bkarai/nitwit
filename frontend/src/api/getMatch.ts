import axios from 'axios';

import { API_PREFIX } from 'consts';

export function getMatch(matchAccessKey: string) {
  return axios.get(`${API_PREFIX}/match/${matchAccessKey}`);
}
