import React from 'react';
import { State as GameState } from 'store';
import { initialState } from 'reducers';
import { Board } from 'model';

interface GameContextObject {
  dispatch: (a: any) => void;
  state: GameState;
  board: Board
}

export const GameContext = React.createContext<GameContextObject>({ dispatch: () => {}, state: initialState, board: new Board(initialState.board) });
