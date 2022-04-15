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
  board: '',
  winner: null,
  matchAccessKey: null,
  moveCount: 0,
}

export enum Action {
  SELECT_PIECE,
  UPDATE_GAME_META,
  SET_MATCH_ACCESS_KEY,
  FINISH_TURN,
};

export function rootReducer(state: State, action: { type: Action, payload: any }): State {
  if (action.type === Action.SELECT_PIECE) {
    return selectPieceReducer(state, action.payload);
  }
  if (action.type === Action.UPDATE_GAME_META) {
    return updateGameMetaReducer(state, action.payload)
  }
  if (action.type === Action.SET_MATCH_ACCESS_KEY) {
    return {...state, matchAccessKey: action.payload};
  }
  if (action.type === Action.FINISH_TURN) {
    return {...state, currentTurn: state.currentTurn === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE};
  }
  return {...state};
};
