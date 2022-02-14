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
