import { Coordinate } from "model";

export type SelectPiecePayload = Coordinate;

export interface UpdateGameMetaPayload {
  userType: null | 'white' | 'black';
  ready: boolean;
  winner: null | 'white' | 'black';
  isWhiteTurn: boolean;
}
