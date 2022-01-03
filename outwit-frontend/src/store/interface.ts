export type Player = 'white' | 'black';

export interface State {
  board: string,
  isWhiteTurn: boolean,
  selectedPiece: { row: null | number, column: null | number },
  winner: null | Player,
  userType: null | Player,
  ready: boolean,
  userMadeMove: boolean,
};
