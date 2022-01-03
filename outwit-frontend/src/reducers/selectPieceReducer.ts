import { Board } from 'model/Board';
import {
  Piece,
  getPieceSingleton,
  EMPTY,
} from 'model/Piece';

import {
  Player,
  State,
} from 'store';

import {
  SelectPiecePayload
} from 'actions/interface';

interface StateFirstSelect extends State {
  selectedPiece: { row: null, column: null },
};

interface StateSecondSelect extends State {
  selectedPiece: { row: number, column: number },
};

// We can break up a select into two cases
// 1. The user is making an initial selection
// 2, The user is making a follow up selection (i.e. a move)

function isSelectingWrongPiece(isWhiteTurn: boolean, selectedPiece: Piece, userType: Player): boolean {
  const whiteTurnAndMovingBlack = isWhiteTurn && (!selectedPiece.isWhite() || (userType === 'black'));
  const blackTurnAndMovingWhite = !isWhiteTurn && (!selectedPiece.isBlack() || (userType === 'white'));
  return whiteTurnAndMovingBlack || blackTurnAndMovingWhite;
}

function firstSelect(state: StateFirstSelect, payload: SelectPiecePayload): State {
  let board = new Board(state.board);

  const nowSelectedRow = payload.row;
  const nowSelectedColumn = payload.column;
  const nowSelectedPiece = board.getPiece(nowSelectedRow, nowSelectedColumn);

  if (nowSelectedPiece.isWhite() || nowSelectedPiece.isBlack()) {
    if (isSelectingWrongPiece(state.isWhiteTurn, nowSelectedPiece, state.userType as Player)) {
      return state;
    } else {
      board.findMoves(nowSelectedRow, nowSelectedColumn);
      return Object.assign({}, state, {
        selectedPiece: { row: nowSelectedRow, column: nowSelectedColumn },
        board: board.serialize(),
      });
    }
  } else {
    return state;
  }
};

function secondSelect(state: StateSecondSelect, payload: SelectPiecePayload): State {
  let board = new Board(state.board);

  const nowSelectedRow = payload.row;
  const nowSelectedColumn = payload.column;
  const nowSelectedPiece = board.getPiece(nowSelectedRow, nowSelectedColumn);

  const previouslySelectedRow = state.selectedPiece.row;
  const previouslySelectedColumn = state.selectedPiece.column;
  const previouslySelectedPiece = board.getPiece(previouslySelectedRow, previouslySelectedColumn);

  const isDeselecting = (nowSelectedRow === previouslySelectedRow) && (nowSelectedColumn === previouslySelectedColumn);
  const isSelectingNewPiece = (state.isWhiteTurn && nowSelectedPiece.isWhite()) || (!state.isWhiteTurn && nowSelectedPiece.isBlack());

  if (isDeselecting) {
    board.clearMoves();
    return Object.assign({}, state, {
      board: board.serialize(),
      selectedPiece: { row: null, column: null },
    });
  } else if (nowSelectedPiece.isMove()) {
    if (isSelectingWrongPiece(state.isWhiteTurn, previouslySelectedPiece, state.userType as Player)) {
      return state;
    } else {
      board.clearMoves();
      board.setPiece(previouslySelectedRow, previouslySelectedColumn, getPieceSingleton(EMPTY));
      board.setPiece(nowSelectedRow, nowSelectedColumn, previouslySelectedPiece);
      return Object.assign({}, state, {
        board: board.serialize(),
        selectedPiece: { row: null, column: null },
        isWhiteTurn: !state.isWhiteTurn,
        winner: board.getWinner(),
        userMadeMove: true,
      });
    }
  } else if (isSelectingNewPiece) {
    board.clearMoves();
    board.findMoves(nowSelectedRow, nowSelectedColumn);
    return Object.assign({}, state, {
      board: board.serialize(),
      selectedPiece: { row: nowSelectedRow, column: nowSelectedColumn },
    });
  } else {
    return state;
  }
}

export default function selectPieceReducer(state: State, payload: SelectPiecePayload): State {
  const previouslySelectedRow = state.selectedPiece.row;
  const previouslySelectedColumn = state.selectedPiece.column;

  if (previouslySelectedRow === null && previouslySelectedColumn === null) {
    return firstSelect(state as StateFirstSelect, payload);
  } else {
    return secondSelect(state as StateSecondSelect, payload);
  }
}
