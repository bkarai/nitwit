import { Action } from 'reducers';
import { Coordinate } from "model";

export type SelectPiecePayload = Coordinate;

export function selectPiece(payload: SelectPiecePayload) {
  return { type: Action.ACTION_SELECT_PIECE, payload };
}

export function updateGameMeta(payload: any) {
  return { type: Action.ACTION_UPDATE_GAME_META, payload };
}

export function finishTurn() {
  return { type: Action.ACTION_FINISH_TURN, payload: {} };
}
