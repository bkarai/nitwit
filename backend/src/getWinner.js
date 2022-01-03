function getIndex(row, column) {
  return (row * 10) + column;
}

function getPiece(row, column, positions) {
  return positions[getIndex(row, column)];
}

function didBlackWin(positions) {
  for (let i = 0; i <= 2; i += 1) {
    for (let j = 0; j <= 2; j += 1) {
      const piece = getPiece(i, j, positions);
      if (!(piece === 'b' || piece === 'B')) {
        return false;
      }
    }
  }
  return true;
}

function didWhiteWin(positions) {
  for (let i = 6; i <= 8; i += 1) {
    for (let j = 7; j <= 9; j += 1) {
      const piece = getPiece(i, j, positions);
      if (!(piece === 'w' || piece === 'W')) {
        return false;
      }
    }
  }
  return true;
}

export default function getWinner(positions) {
  if (didWhiteWin(positions)) {
    return 'white';
  }
  if (didBlackWin(positions)) {
    return 'black';
  }
  return null;
}
