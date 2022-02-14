import axios from 'axios';
import { API_PREFIX } from 'consts';

interface PostMatchResponse {
  matchAccessKey: string;
};

export function postMatch() {
  return axios.post<PostMatchResponse>(`${API_PREFIX}/match`, {},
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
}
