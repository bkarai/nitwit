import styled from '@emotion/styled';
import { Game } from 'model';
import { BrownTile, OrangeTile, YellowTile } from './Tile';
import Chip from './Chip';

const GameBoardWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  td: {
    padding: '1px',
  },
});

const game = new Game();


export function GameBoard() {
  return (
    <GameBoardWrapper>
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          {game.getSpots().map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((spot, columnIndex) => (
                <td key={columnIndex}>
                  {spot.isPartOfBlackGoal() && (
                    <BrownTile>
                      <Chip rowIndex={rowIndex} columnIndex={columnIndex}/>
                    </BrownTile>
                  )}
                  {!spot.isPartOfGoal() && (
                    <OrangeTile>
                      <Chip rowIndex={rowIndex} columnIndex={columnIndex}/>
                    </OrangeTile>
                  )}
                  {spot.isPartOfWhiteGoal() && (
                    <YellowTile>
                      <Chip rowIndex={rowIndex} columnIndex={columnIndex}/>
                    </YellowTile>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </GameBoardWrapper>
  );
}
