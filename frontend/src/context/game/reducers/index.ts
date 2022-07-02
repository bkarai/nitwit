import { selectPieceReducer } from './selectPieceReducer';
import { updateGameMetaReducer } from './updateGameMetaReducer';
import { PieceColor, INITIAL_BOARD_STATE } from 'model';
import { 
  Action,
  State
} from 'context/game';

export const initialStateNetwork: State = {
  currentTurn: PieceColor.WHITE,
  selectedPiece: null,
  userType: null,
  ready: false,
  board: INITIAL_BOARD_STATE,
  winner: null,
  matchAccessKey: null,
  moveCount: 0,
  isLocalGame: false,
}

export const initialStateLocal: State = {
  currentTurn: PieceColor.WHITE,
  selectedPiece: null,
  userType: null,
  ready: true,
  board: INITIAL_BOARD_STATE,
  winner: null,
  matchAccessKey: null,
  moveCount: 0,
  isLocalGame: true,
}

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
    return {...state, currentTurn: state.currentTurn === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE, moveCount: 0};
  }
  if (action.type === Action.CLEAR_SELECTED_PIECE) {
    if (state.selectedPiece) {
      return selectPieceReducer(state, state.selectedPiece);
    }
  }
  return {...state};
};
