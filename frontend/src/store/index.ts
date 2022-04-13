import { Coordinate, PieceColor } from "model";

export interface State {
  board: string;
  currentTurn: PieceColor,
  selectedPiece: Coordinate | null,
  userType: null | PieceColor,
  ready: boolean,
  userMadeMove: boolean,
  winner: null | PieceColor,
  matchAccessKey: string | null,
};
