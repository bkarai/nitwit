import Game from './Game';
import enhancer from '../enhancer';

const GamePage = {
  Component: enhancer(Game),
  path: '/game/:matchAccessKey',
  name: 'Game',
};

export default GamePage;
