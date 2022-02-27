import { Coordinate, Board, Piece, PieceColor } from 'model';

import {
  State,
} from 'store';

import {
  SelectPiecePayload
} from 'actions';

interface StateFirstSelect extends State {
  selectedPiece: null,
};

interface StateSecondSelect extends State {
  selectedPiece: Coordinate,
};

// We can break up a select into two cases
// 1. The user is making an initial selection
// 2, The user is making a follow up selection (i.e. a move)

function isSelectingWrongPiece(isWhiteTurn: boolean, selectedPiece: Piece, userType: PieceColor): boolean {
  const whiteTurnAndMovingBlack = isWhiteTurn && (!selectedPiece.isWhite() || (userType === PieceColor.BLACK));
  const blackTurnAndMovingWhite = !isWhiteTurn && (!selectedPiece.isBlack() || (userType === PieceColor.WHITE));
  return whiteTurnAndMovingBlack || blackTurnAndMovingWhite;
}

function firstSelect(state: StateFirstSelect, payload: SelectPiecePayload): State {
  const gameBoard = new Board();
  gameBoard.configure(state.board);

  const nowSelectedRow = payload.row;
  const nowSelectedColumn = payload.column;
  const nowSelectedPiece = gameBoard.getPiece(nowSelectedRow, nowSelectedColumn);

  if (nowSelectedPiece) {
    if (isSelectingWrongPiece(state.isWhiteTurn, nowSelectedPiece, state.userType!)) {
      return {...state};
    } else {
      gameBoard.findMoves(nowSelectedRow, nowSelectedColumn);
      return Object.assign({}, state, {
        selectedPiece: { row: nowSelectedRow, column: nowSelectedColumn },
        board: gameBoard.serialize(),
      });
    }
  } else {
    return {...state};
  }
};

function secondSelect(state: StateSecondSelect, payload: SelectPiecePayload): State {
  const gameBoard = new Board();
  gameBoard.configure(state.board);

  const nowSelectedRow = payload.row;
  const nowSelectedColumn = payload.column;
  const nowSelectedSpot = gameBoard.getSpot(nowSelectedRow, nowSelectedColumn);
  const nowSelectedPiece = nowSelectedSpot.getPiece();

  const previouslySelectedRow = state.selectedPiece.row;
  const previouslySelectedColumn = state.selectedPiece.column;
  const previouslySelectedPiece = gameBoard.getPiece(previouslySelectedRow, previouslySelectedColumn)!;

  const isDeselecting = (nowSelectedRow === previouslySelectedRow) && (nowSelectedColumn === previouslySelectedColumn);
  const isSelectingNewPiece = (state.isWhiteTurn && nowSelectedPiece?.isWhite()) || (!state.isWhiteTurn && nowSelectedPiece?.isBlack());

  if (isDeselecting) {
    gameBoard.clearMoves();
    return Object.assign({}, state, {
      selectedPiece: null,
      board: gameBoard.serialize(),
    });
  } else if (nowSelectedSpot.isPotentialMove()) {
    if (isSelectingWrongPiece(state.isWhiteTurn, previouslySelectedPiece, state.userType as PieceColor)) {
      return state;
    } else {
      gameBoard.clearMoves();
      previouslySelectedPiece.setSpot(gameBoard.getSpot(nowSelectedRow, nowSelectedColumn));
      return Object.assign({}, state, {
        selectedPiece: null,
        isWhiteTurn: !state.isWhiteTurn,
        userMadeMove: true,
        board: gameBoard.serialize(),
      });
    }
  } else if (isSelectingNewPiece) {
    gameBoard.clearMoves();
    gameBoard.findMoves(nowSelectedRow, nowSelectedColumn);
    return Object.assign({}, state, {
      selectedPiece: { row: nowSelectedRow, column: nowSelectedColumn },
      board: gameBoard.serialize(),
    });
  } else {
    return state;
  }
}

export function selectPieceReducer(state: State, payload: SelectPiecePayload): State {
  const previouslySelectedRow = state.selectedPiece?.row;
  const previouslySelectedColumn = state.selectedPiece?.column;

  if (previouslySelectedRow === undefined && previouslySelectedColumn === undefined) {
    return firstSelect(state as StateFirstSelect, payload);
  } else {
    return secondSelect(state as StateSecondSelect, payload);
  }
}
