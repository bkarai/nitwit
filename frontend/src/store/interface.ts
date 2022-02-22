import { Coordinate, Piece, PieceColor } from "model";

export interface State {
  board: string,
  isWhiteTurn: boolean,
  selectedPiece: Coordinate | null,
  winner: null | PieceColor,
  userType: null | PieceColor,
  ready: boolean,
  userMadeMove: boolean,
};
