import { pageEnhancer } from './pageEnhancer';

import { Home } from './Home';
import { Join } from './Join';
import { Game } from './Game';
import { Instructions } from './Instructions';
import { LocalGame } from './LocalGame';
export const pages = [Home, Join, Game, Instructions, LocalGame].map(({ Component, ...other }) => ({ Component: pageEnhancer(Component), ...other }));
