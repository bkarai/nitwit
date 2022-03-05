import { Join } from './Join';
import { pageEnhancer } from '../pageEnhancer';

const JoinPage = {
  Component: Join,
  path: '/game/:gameAccessKey/join',
  name: 'Join',
};

export { JoinPage as Join };
