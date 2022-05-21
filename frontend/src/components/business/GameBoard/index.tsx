import styled from '@emotion/styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Spot } from 'model';
import { GamePiece, BrownTile, OrangeTile, YellowTile } from 'components';
import { useDroppableSpot } from 'hooks';
import { useContext } from 'react';
import { GameContext } from 'context';

const GameBoardWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  td: {
    padding: '1px',
  },
});

interface GameBoardSpotProps {
  row: number;
  column: number;
};

function GameBoardSpot({
  row, column
}: GameBoardSpotProps) {
  const tempSpot = new Spot(row, column);
  
  if (tempSpot.isPartOfBlackGoal()) {
    return (
      <BrownTile>
        <GamePiece rowIndex={row} columnIndex={column}/>
      </BrownTile>
    );
  } else if (tempSpot.isPartOfWhiteGoal()) {
    return (
      <YellowTile>
        <GamePiece rowIndex={row} columnIndex={column}/>
      </YellowTile>
    );
  } else {
    return (
      <OrangeTile>
        <GamePiece rowIndex={row} columnIndex={column}/>
      </OrangeTile>
    );
  }
};

function DropableGameBoardSpot(props: GameBoardSpotProps) {
  const { row, column } = props;
  const { dropRef, isOver } = useDroppableSpot(row, column);

  return (
    <div ref={dropRef} style={{ border: isOver ? '2px solid' : 'none' }}>
      <GameBoardSpot {...props}/>
    </div>
  );
}

export function GameBoard() {
  const { board } = useContext(GameContext);

  return (
    <DndProvider backend={HTML5Backend}>
      <GameBoardWrapper>
        <table cellPadding="0" cellSpacing="0">
          <tbody>
            {board.getSpots().map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((spot, columnIndex) => (
                  <td key={columnIndex}>
                    <DropableGameBoardSpot row={spot.getLocation().row} column={spot.getLocation().column}/>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </GameBoardWrapper>
    </DndProvider>
  );
}
