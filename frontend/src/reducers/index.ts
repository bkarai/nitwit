import {
  ACTION_FINISH_TURN,
  ACTION_SELECT_PIECE,
  ACTION_UPDATE_GAME_META,
} from 'consts';

import selectPieceReducer from './selectPieceReducer';

import { 
  State
} from 'store';

const initialState: State = {
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
  selectedPiece: { row: null, column: null },
  hoverPiece: { row: null, column: null },
  winner: null,
  userType: null,
  ready: false,
  userMadeMove: false,
}

export default function rootReducer(state: State = initialState, action: { type: string, payload: any }): State {
  if (action.type === ACTION_SELECT_PIECE) {
    return selectPieceReducer(state, action.payload);
  }
  if (action.type === ACTION_UPDATE_GAME_META) {
    return {...state, ...action.payload};
  }
  if (action.type === ACTION_FINISH_TURN) {
    return {...state, userMadeMove: false}
  }
  return state;
};
