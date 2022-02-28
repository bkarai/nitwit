import { TimelinePosition } from "components";

export function getTimelinePosition(hasWinner: boolean, ready: boolean): TimelinePosition {
  if (hasWinner) {
    return TimelinePosition.GAME_ENDED;
  } else if (ready) {
    return TimelinePosition.GAME_IN_PROGRESS;
  } else {
    return TimelinePosition.P1_JOINED;
  }
};
