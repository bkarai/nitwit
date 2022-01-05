import {
  ACTION_SELECT_PIECE,
  ACTION_UPDATE_GAME_META,
  ACTION_FINISH_TURN,
  ACTION_HOVER_PIECE,
} from 'consts';

import {
  SelectPiecePayload,
} from './interface';

export function selectPiece(payload: SelectPiecePayload) {
  return { type: ACTION_SELECT_PIECE, payload };
}

export function updateGameMeta(payload: any) {
  return { type: ACTION_UPDATE_GAME_META, payload };
}

export function finishTurn() {
  return { type: ACTION_FINISH_TURN, payload: {} };
}

export function hoverPiece(payload: SelectPiecePayload) {
  return { type: ACTION_HOVER_PIECE, payload };
}
