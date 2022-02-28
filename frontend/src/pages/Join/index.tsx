import { Join } from './Join';
import { pageEnhancer } from '../pageEnhancer';

const JoinPage = {
  Component: pageEnhancer(Join),
  path: '/game/:gameAccessKey/join',
  name: 'Join',
};

export { JoinPage as Join };
