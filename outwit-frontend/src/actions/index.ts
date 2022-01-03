import {
  ACTION_SELECT_PIECE,
  ACTION_UPDATE_GAME_META,
  ACTION_FINISH_TURN,
} from 'consts';

import {
  SelectPiecePayload,
} from './interface';

export function selectPiece(payload: SelectPiecePayload): {
  type: string,
  payload: SelectPiecePayload,
} {
  return { type: ACTION_SELECT_PIECE, payload };
}

export function updateGameMeta(payload: any) {
  return { type: ACTION_UPDATE_GAME_META, payload };
}

export function finishTurn() {
  return { type: ACTION_FINISH_TURN, payload: {} };
}
