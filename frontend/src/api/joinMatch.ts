import axios from 'axios';
import { joinMatchPath, AXIOS_CONFIG_POST } from './util';

export function joinMatch(matchAccessKey: string) {
  return axios.post<null>(joinMatchPath(matchAccessKey), {}, AXIOS_CONFIG_POST);
}
