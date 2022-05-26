import { Coordinate, Board, Piece, PieceColor } from 'model';

import {
  State,
} from 'context/game';

import {
  SelectPiecePayload
} from 'context/game';

interface StateFirstSelect extends State {
  selectedPiece: null,
};

interface StateSecondSelect extends State {
  selectedPiece: Coordinate,
};

// We can break up a select into two cases
// 1. The user is making an initial selection
// 2, The user is making a follow up selection (i.e. a move)

function isSelectingWrongPiece(currentTurn: PieceColor, selectedPiece: Piece, userType: PieceColor): boolean {
  const whiteTurnAndMovingBlack = (currentTurn === PieceColor.WHITE) && (!selectedPiece.isWhite() || (userType === PieceColor.BLACK));
  const blackTurnAndMovingWhite = (currentTurn === PieceColor.BLACK) && (!selectedPiece.isBlack() || (userType === PieceColor.WHITE));
  return whiteTurnAndMovingBlack || blackTurnAndMovingWhite;
}

function firstSelect(state: StateFirstSelect, payload: SelectPiecePayload): State {
  const gameBoard = new Board(state.board);

  const nowSelectedCoordinate = payload;
  const nowSelectedPiece = gameBoard.getPiece(nowSelectedCoordinate);

  if (nowSelectedPiece) {
    if (isSelectingWrongPiece(state.currentTurn, nowSelectedPiece, state.userType!)) {
      return {...state};
    } else {
      gameBoard.findMoves(payload);
      return Object.assign({}, state, {
        selectedPiece: {...nowSelectedCoordinate},
        board: gameBoard.serialize(),
      });
    }
  } else {
    return {...state};
  }
};

function secondSelect(state: StateSecondSelect, payload: SelectPiecePayload): State {
  const gameBoard = new Board(state.board);

  const nowSelectedCoordinate = payload;
  const nowSelectedSpot = gameBoard.getSpot(nowSelectedCoordinate);
  const nowSelectedPiece = nowSelectedSpot.getPiece();

  const previouslySelectedCoordinate = state.selectedPiece;
  const previouslySelectedPiece = gameBoard.getPiece(previouslySelectedCoordinate)!;

  const isDeselecting = (nowSelectedCoordinate.row === previouslySelectedCoordinate.row) && (nowSelectedCoordinate.column === previouslySelectedCoordinate.column);
  const isSelectingNewPiece = ((state.currentTurn === PieceColor.WHITE) && nowSelectedPiece?.isWhite()) || ((state.currentTurn === PieceColor.BLACK) && nowSelectedPiece?.isBlack());

  if (isDeselecting) {
    gameBoard.clearMoves();
    return Object.assign({}, state, {
      selectedPiece: null,
      board: gameBoard.serialize(),
    });
  } else if (nowSelectedSpot.isPotentialMove()) {
    if (isSelectingWrongPiece(state.currentTurn, previouslySelectedPiece, state.userType!)) {
      return state;
    } else {
      gameBoard.clearMoves();
      previouslySelectedPiece.setSpot(gameBoard.getSpot(payload));
      return Object.assign({}, state, {
        selectedPiece: null,
        board: gameBoard.serialize(),
        moveCount: state.moveCount + 1,
        winner: gameBoard.getWinner(),
      });
    }
  } else if (isSelectingNewPiece) {
    gameBoard.clearMoves();
    gameBoard.findMoves(payload);
    return Object.assign({}, state, {
      selectedPiece: { ...nowSelectedCoordinate },
      board: gameBoard.serialize(),
    });
  } else {
    return state;
  }
}

export function selectPieceReducer(state: State, payload: SelectPiecePayload): State {
  if (state.winner) {
    return state;
  }

  const previouslySelectedRow = state.selectedPiece?.row;
  const previouslySelectedColumn = state.selectedPiece?.column;

  if (previouslySelectedRow === undefined && previouslySelectedColumn === undefined) {
    return firstSelect(state as StateFirstSelect, payload);
  } else {
    return secondSelect(state as StateSecondSelect, payload);
  }
}
