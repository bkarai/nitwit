import { selectPieceReducer } from './selectPieceReducer';

import { 
  State
} from 'store';

export const initialState: State = {
  board:
`\
xxxxxxxxwb\
xxxxxxxwbx\
xxxxxxwbxx\
xxxxxwbxxx\
xxxxWBxxxx\
xxxwbxxxxx\
xxwbxxxxxx\
xwbxxxxxxx\
wbxxxxxxxx\
`,
  isWhiteTurn: true,
  selectedPiece: null,
  winner: null,
  userType: null,
  ready: false,
  userMadeMove: false,
}

export enum Action {
  ACTION_SELECT_PIECE,
  ACTION_UPDATE_GAME_META,
  ACTION_FINISH_TURN,
};

export function rootReducer(state: State = initialState, action: { type: Action, payload: any }): State {
  if (action.type === Action.ACTION_SELECT_PIECE) {
    return selectPieceReducer(state, action.payload);
  }
  if (action.type === Action.ACTION_UPDATE_GAME_META) {
    return {...state, ...action.payload};
  }
  if (action.type === Action.ACTION_FINISH_TURN) {
    return {...state, userMadeMove: false}
  }
  return state;
};
