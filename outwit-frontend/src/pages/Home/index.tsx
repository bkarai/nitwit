import Home from './Home';
import enhancer from '../enhancer';

const HomePage = {
  Component: enhancer(Home),
  path: '/',
  name: 'Home',
};

export default HomePage;
