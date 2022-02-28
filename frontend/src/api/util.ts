const API_PREFIX = '/api';

export function matchPath(gameAccessKey?: string) {
  const basePath = `${API_PREFIX}/match`;
  return gameAccessKey ? `${basePath}/${gameAccessKey}` : basePath;
}

export function movePiecePath(gameAccessKey: string) {
  return `${matchPath(gameAccessKey)}/move`;
}

export function joinMatchPath(gameAccessKey: string) {
  return `${matchPath(gameAccessKey)}/join`;
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
