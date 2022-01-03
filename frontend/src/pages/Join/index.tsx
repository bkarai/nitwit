import Join from './Join';
import enhancer from '../enhancer';

const JoinPage = {
  Component: enhancer(Join),
  path: '/game/:matchAccessKey/join',
  name: 'Join',
};

export default JoinPage;
