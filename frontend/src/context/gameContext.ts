import React from 'react';
import { State as GameState } from 'store';
import { initialState } from 'reducers';

interface GameContextObject {
  dispatch: (a: any) => void;
  state: GameState;
}

export const GameContext = React.createContext<GameContextObject>({ dispatch: () => {}, state: initialState });
