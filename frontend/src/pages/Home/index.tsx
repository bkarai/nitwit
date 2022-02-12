import { Home } from './Home';
import { pageEnhancer } from '../pageEnhancer';

const HomePage = {
  Component: pageEnhancer(Home),
  path: '/',
  name: 'Home',
};

export { HomePage as Home };
