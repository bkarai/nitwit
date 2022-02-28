import axios from 'axios';
import { joinMatchPath, AXIOS_CONFIG_POST } from './util';

export function joinMatch(gameAccessKey: string) {
  return axios.post<null>(joinMatchPath(gameAccessKey), {}, AXIOS_CONFIG_POST);
}
