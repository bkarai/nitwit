import { Game } from './Game';
import { pageEnhancer } from '../pageEnhancer';

const GamePage = {
  Component: pageEnhancer(Game),
  path: '/game/:matchAccessKey',
  name: 'Game',
};

export { GamePage as Game };
