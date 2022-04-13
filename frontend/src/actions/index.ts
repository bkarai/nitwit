import { Action } from 'reducers';
import { Coordinate } from "model";
import { GetMatchResponse } from 'api';

export type SelectPiecePayload = Coordinate;

export function selectPiece(payload: SelectPiecePayload) {
  return { type: Action.SELECT_PIECE, payload };
}

export function updateGameMeta(payload: GetMatchResponse) {
  return { type: Action.UPDATE_GAME_META, payload };
}

export function finishTurn() {
  return { type: Action.FINISH_TURN };
}

export function setMatchAccessKey(matchAccessKey: string) {
  return { type: Action.SET_MATCH_ACCESS_KEY, payload: matchAccessKey };
}
