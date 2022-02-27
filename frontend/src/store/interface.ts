import { Coordinate, Match, PieceColor } from "model";

export interface State {
  isWhiteTurn: boolean,
  selectedPiece: Coordinate | null,
  userType: null | PieceColor,
  ready: boolean,
  userMadeMove: boolean,
  match: Match;
};
