import { selectPieceReducer } from './selectPieceReducer';
import { updateGameMetaReducer } from './updateGameMetaReducer';
import { PieceColor } from 'model';
import { 
  State
} from 'store';

export const initialState: State = {
  currentTurn: PieceColor.WHITE,
  selectedPiece: null,
  userType: null,
  ready: false,
  userMadeMove: false,
  board: '',
  winner: null,
  matchAccessKey: null,
}

export enum Action {
  SELECT_PIECE,
  UPDATE_GAME_META,
  FINISH_TURN,
  SET_MATCH_ACCESS_KEY,
};

export function rootReducer(state: State, action: { type: Action, payload: any }): State {
  if (action.type === Action.SELECT_PIECE) {
    return selectPieceReducer(state, action.payload);
  }
  if (action.type === Action.UPDATE_GAME_META) {
    return updateGameMetaReducer(state, action.payload)
  }
  if (action.type === Action.FINISH_TURN) {
    return {...state, userMadeMove: false};
  }
  if (action.type === Action.SET_MATCH_ACCESS_KEY) {
    return {...state, matchAccessKey: action.payload};
  }
  return {...state};
};
