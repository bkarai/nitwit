import { Join } from './Join';
import { pageEnhancer } from '../pageEnhancer';

const JoinPage = {
  Component: pageEnhancer(Join),
  path: '/game/:matchAccessKey/join',
  name: 'Join',
};

export { JoinPage as Join };
