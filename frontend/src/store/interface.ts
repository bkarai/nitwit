import { Coordinate } from "model";

export type Player = 'white' | 'black';

export interface State {
  board: string,
  isWhiteTurn: boolean,
  selectedPiece: Coordinate | null,
  winner: null | Player,
  userType: null | Player,
  ready: boolean,
  userMadeMove: boolean,
};
