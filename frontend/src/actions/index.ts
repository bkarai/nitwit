import { Action } from 'reducers';
import { Coordinate } from "model";
import { State } from 'store';

export type SelectPiecePayload = Coordinate;

export function selectPiece(payload: SelectPiecePayload) {
  return { type: Action.SELECT_PIECE, payload };
}

export function updateGameMeta(payload: Partial<State>) {
  return { type: Action.UPDATE_GAME_META, payload };
}

export function finishTurn() {
  return { type: Action.FINISH_TURN };
}

export function gameIsReady() {
  return { type: Action.GAME_IS_READY };
}
