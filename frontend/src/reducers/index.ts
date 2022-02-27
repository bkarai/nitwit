import { selectPieceReducer } from './selectPieceReducer';

import { 
  State
} from 'store';

import { Match } from 'model';

export const initialState: State = {
  isWhiteTurn: true,
  selectedPiece: null,
  userType: null,
  ready: false,
  userMadeMove: false,
  match: new Match(),
}

export enum Action {
  ACTION_SELECT_PIECE,
  ACTION_UPDATE_GAME_META,
  ACTION_FINISH_TURN,
};

export function rootReducer(state: State, action: { type: Action, payload: any }): State {
  if (action.type === Action.ACTION_SELECT_PIECE) {
    return selectPieceReducer(state, action.payload);
  }
  if (action.type === Action.ACTION_UPDATE_GAME_META) {
    if (action.payload.board) {
      state.match.getBoard().configure(action.payload.board);
    }
    return {...state, ...action.payload};
  }
  if (action.type === Action.ACTION_FINISH_TURN) {
    return {...state, userMadeMove: false}
  }
  return {...state};
};
