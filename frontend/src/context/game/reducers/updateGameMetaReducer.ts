import { GetMatchResponse } from "api";
import { State } from "context/game";
import { PieceColor } from "model";

export function updateGameMetaReducer(state: State, match: GetMatchResponse): State {
  const { userType, ready, isWhiteTurn, positions, winner } = match;
  
  return {
    ...state,
    userType,
    ready,
    winner,
    board: positions,
    currentTurn: isWhiteTurn ? PieceColor.WHITE : PieceColor.BLACK,
    moveCount: 0,
  }
}
