import { useEffect, useContext } from "react";
import { GameContext } from "context";
import { useGameAccessKey, usePollForGameData } from "hooks";
import { PieceColor } from "model";
import { updateGameMeta } from "actions";

export function useSyncMatchToState(pollTimeInSeconds: number = 5) {
  const { state: { isWhiteTurn, userType, ready }, dispatch } = useContext(GameContext);
  const gameAccessKey = useGameAccessKey();
  const pollForGameData = (isWhiteTurn && userType === PieceColor.BLACK) || (!isWhiteTurn && userType === PieceColor.WHITE) || !userType || !ready;
  const gameData = usePollForGameData(gameAccessKey, pollForGameData, pollTimeInSeconds);

  useEffect(() => {
    if (gameData) {
      dispatch(updateGameMeta(gameData));
    }
  }, [JSON.stringify(gameData)]);
}
