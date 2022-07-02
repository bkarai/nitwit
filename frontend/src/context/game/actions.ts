import { Coordinate } from "model";
import { GetMatchResponse } from 'api';

export enum Action {
  SELECT_PIECE,
  UPDATE_GAME_META,
  SET_MATCH_ACCESS_KEY,
  FINISH_TURN,
  CLEAR_SELECTED_PIECE,
};

export type SelectPiecePayload = Coordinate;

export function selectPiece(payload: SelectPiecePayload) {
  return { type: Action.SELECT_PIECE, payload };
}

export function updateGameMeta(payload: GetMatchResponse) {
  return { type: Action.UPDATE_GAME_META, payload };
}

export function setMatchAccessKey(matchAccessKey: string) {
  return { type: Action.SET_MATCH_ACCESS_KEY, payload: matchAccessKey };
}

export function finishTurn() {
  return { type: Action.FINISH_TURN, payload: null };
}

export function clearSelectedPiece() {
  return { type: Action.CLEAR_SELECTED_PIECE, payload: null };
}
