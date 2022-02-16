import styled from '@emotion/styled';
import { Game, Spot } from 'model';
import { EnhancedPiece, BrownTile, OrangeTile, YellowTile } from 'components';

const GameBoardWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  td: {
    padding: '1px',
  },
});

const game = new Game();

interface GameBoardSpotProps {
  spot: Spot;
};

function GameBoardSpot({
  spot
}: GameBoardSpotProps) {
  const { row, column } = spot.getLocation();
  
  if (spot.isPartOfBlackGoal()) {
    return (
      <BrownTile>
        <EnhancedPiece rowIndex={row} columnIndex={column}/>
      </BrownTile>
    );
  } else if (spot.isPartOfWhiteGoal()) {
    return (
      <YellowTile>
        <EnhancedPiece rowIndex={row} columnIndex={column}/>
      </YellowTile>
    );
  } else {
    return (
      <OrangeTile>
        <EnhancedPiece rowIndex={row} columnIndex={column}/>
      </OrangeTile>
    );
  }
};

export function GameBoard() {
  return (
    <GameBoardWrapper>
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          {game.getSpots().map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((spot, columnIndex) => (
                <td key={columnIndex}>
                  <GameBoardSpot spot={spot}/>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </GameBoardWrapper>
  );
}
