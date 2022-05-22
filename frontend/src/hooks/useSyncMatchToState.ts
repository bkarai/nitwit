import { useEffect, useContext } from "react";
import { GameContext } from "context/game";
import { usePollForGameData } from "hooks";
import { updateGameMeta } from "context/game";

export function useSyncMatchToState(gameAccessKey: string, pollTimeInSeconds: number = 5) {
  const { state: { currentTurn, userType, ready }, dispatch } = useContext(GameContext);
  const pollForGameData = (currentTurn !== userType) || !userType || !ready;
  const gameData = usePollForGameData(gameAccessKey, pollForGameData, pollTimeInSeconds);

  useEffect(() => {
    if (gameData) {
      dispatch(updateGameMeta(gameData));
    }
  }, [JSON.stringify(gameData), dispatch]);
}
