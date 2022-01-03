export function getTimelinePosition(hasWinner: boolean, ready: boolean) {
  if (hasWinner) {
    return 'game-ended';
  } else if (ready) {
    return 'game-in-progress';
  } else {
    return 'p1-joined';
  }
};
