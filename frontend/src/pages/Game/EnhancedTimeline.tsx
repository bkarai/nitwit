import { useContext } from 'react';
import { GameContext } from 'context';
import { Timeline, TimelinePosition } from "components";

function getTimelinePosition(hasWinner: boolean, ready: boolean): TimelinePosition {
  if (hasWinner) {
    return TimelinePosition.GAME_ENDED;
  } else if (ready) {
    return TimelinePosition.GAME_IN_PROGRESS;
  } else {
    return TimelinePosition.P1_JOINED;
  }
};

export function EnhancedTimeline() {
  const { state: { winner, ready, userType } } = useContext(GameContext);
  const isLoading = userType === null;

  return (
    <Timeline position={isLoading ? undefined : getTimelinePosition(winner !== null, ready)}/>
  );
};
