import { selectPieceReducer } from './selectPieceReducer';

import { 
  State
} from 'store';

export const initialState: State = {
  isWhiteTurn: true,
  selectedPiece: null,
  userType: null,
  ready: false,
  userMadeMove: false,
  board: '',
}

export enum Action {
  SELECT_PIECE,
  UPDATE_GAME_META,
  FINISH_TURN,
};

export function rootReducer(state: State, action: { type: Action, payload: any }): State {
  if (action.type === Action.SELECT_PIECE) {
    return selectPieceReducer(state, action.payload);
  }
  if (action.type === Action.UPDATE_GAME_META) {
    return {...state, ...action.payload};
  }
  if (action.type === Action.FINISH_TURN) {
    return {...state, userMadeMove: false};
  }
  return {...state};
};
