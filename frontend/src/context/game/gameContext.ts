import React from 'react';
import { initialStateLocal } from 'context/game/reducers';
import { Board, Coordinate, Piece, PieceColor } from 'model';

export interface State {
  board: string;
  currentTurn: PieceColor,
  selectedPiece: Coordinate | null,
  userType: null | PieceColor,
  ready: boolean,
  winner: null | PieceColor,
  matchAccessKey: string | null,
  moveCount: number,
  isLocalGame: boolean,
};

interface GameContextObject {
  dispatch: (a: any) => void;
  state: State;
  board: Board;
  selectedPiece: Piece | null;
}

// The initial state here doesn't really matter
export const GameContext = React.createContext<GameContextObject>({ dispatch: () => {}, state: initialStateLocal, board: new Board(initialStateLocal.board), selectedPiece: null });
