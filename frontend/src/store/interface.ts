import { Coordinate, PieceColor } from "model";

export interface State {
  board: string;
  isWhiteTurn: boolean,
  selectedPiece: Coordinate | null,
  userType: null | PieceColor,
  ready: boolean,
  userMadeMove: boolean,
  winner: null | PieceColor,
};
