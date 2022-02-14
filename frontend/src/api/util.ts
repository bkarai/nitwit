const API_PREFIX = '/api';

export function matchPath(matchAccessKey?: string) {
  const basePath = `${API_PREFIX}/match`;
  return matchAccessKey ? `${basePath}/${matchAccessKey}` : basePath;
}

export function movePiecePath(matchAccessKey: string) {
  return `${matchPath(matchAccessKey)}/move`;
}

export function joinMatchPath(matchAccessKey: string) {
  return `${matchPath(matchAccessKey)}/join`;
}

const API_RESPONSE_CONTENT_TYPE = 'application/json';
const API_REQUEST_CONTENT_TYPE = API_RESPONSE_CONTENT_TYPE;

export const AXIOS_CONFIG_GET = {
  headers: {
    'Accept': API_RESPONSE_CONTENT_TYPE,
  }
};

export const AXIOS_CONFIG_POST = {
  headers: {
    'Content-Type': API_REQUEST_CONTENT_TYPE,
    'Accept': API_RESPONSE_CONTENT_TYPE,
  }
};
