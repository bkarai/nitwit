import React from 'react';
import { initialState } from 'context/game/reducers';
import { Board, Coordinate, PieceColor } from 'model';

export interface State {
  board: string;
  currentTurn: PieceColor,
  selectedPiece: Coordinate | null,
  userType: null | PieceColor,
  ready: boolean,
  winner: null | PieceColor,
  matchAccessKey: string | null,
  moveCount: number,
};

interface GameContextObject {
  dispatch: (a: any) => void;
  state: State;
  board: Board
}

export const GameContext = React.createContext<GameContextObject>({ dispatch: () => {}, state: initialState, board: new Board(initialState.board) });
