export interface GameStatusWrapperProps {
  userType: null | 'white' | 'black';
  ready: boolean;
  winner: null | 'white' | 'black';
  isWhiteTurn: boolean;
};

export type GameStatusProps = GameStatusWrapperProps;
