import axios from 'axios';
import { matchPath, AXIOS_CONFIG_POST } from './util';

interface CreateMatchResponse {
  matchAccessKey: string;
};

const MATCH_PATH = matchPath();

export function createMatch() {
  return axios.post<CreateMatchResponse>(MATCH_PATH, {}, AXIOS_CONFIG_POST);
}
