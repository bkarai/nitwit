import { pageEnhancer } from './pageEnhancer';

import { Home } from './Home';
import { Join } from './Join';
import { Game } from './Game';
import { Instructions } from './Instructions';
export const pages = [Home, Join, Game, Instructions].map(({ Component, ...other }) => ({ Component: pageEnhancer(Component), ...other }));
