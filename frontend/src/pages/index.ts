import { pageEnhancer } from './pageEnhancer';

import { Home } from './Home';
import { Join } from './Join';
import { Game } from './Game';
export const pages = [Home, Join, Game].map(({ Component, ...other }) => ({ Component: pageEnhancer(Component), ...other }));
