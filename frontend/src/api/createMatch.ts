import axios from 'axios';
import { matchPath } from './util';

interface CreateMatchResponse {
  matchAccessKey: string;
};

const MATCH_PATH = matchPath();

export function createMatch() {
  return axios.post<CreateMatchResponse>(MATCH_PATH, {},
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
}
