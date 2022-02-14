import axios from 'axios';
import { API_PREFIX } from 'consts';

export function joinMatch(matchAccessKey: string) {
  return axios.post(`${API_PREFIX}/match/${matchAccessKey}/join`, {},
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
}
