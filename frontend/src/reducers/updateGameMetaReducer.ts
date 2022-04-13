import { GetMatchResponse } from "api";
import { State } from "store";
import { PieceColor } from "model";

export function updateGameMetaReducer(state: State, match: GetMatchResponse) {
  const { userType, ready, isWhiteTurn, positions, winner } = match;
  
  return {
    ...state,
    userType,
    ready,
    winner,
    board: positions,
    currentTurn: isWhiteTurn ? PieceColor.WHITE : PieceColor.BLACK,
  }
}
