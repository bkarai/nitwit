import styled from '@emotion/styled';
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

const layout = [
  'bbbooooooo',
  'bbbooooooo',
  'bbbooooooo',
  'oooooooooo',
  'oooooooooo',
  'oooooooooo',
  'oooooooyyy',
  'oooooooyyy',
  'oooooooyyy',
];

export function GameBoard() {
  return (
    <GameBoardWrapper>
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          {layout.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.split('').map((tile, columnIndex) => (
                <td key={columnIndex}>
                  {tile === 'b' && (
                    <BrownTile>
                      <Chip rowIndex={rowIndex} columnIndex={columnIndex}/>
                    </BrownTile>
                  )}
                  {tile === 'o' && (
                    <OrangeTile>
                      <Chip rowIndex={rowIndex} columnIndex={columnIndex}/>
                    </OrangeTile>
                  )}
                  {tile === 'y' && (
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
