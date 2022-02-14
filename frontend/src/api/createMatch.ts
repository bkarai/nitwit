import axios from 'axios';
import { API_PREFIX } from 'consts';

interface CreateMatchResponse {
  matchAccessKey: string;
};

export function createMatch() {
  return axios.post<CreateMatchResponse>(`${API_PREFIX}/match`, {},
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
}
