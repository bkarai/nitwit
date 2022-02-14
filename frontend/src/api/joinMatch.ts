import axios from 'axios';
import { joinMatchPath } from './util';

export function joinMatch(matchAccessKey: string) {
  return axios.post<null>(joinMatchPath(matchAccessKey), {},
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
}
