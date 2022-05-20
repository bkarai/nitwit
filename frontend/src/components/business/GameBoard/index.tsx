import styled from '@emotion/styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board, Spot } from 'model';
import { GamePiece, BrownTile, OrangeTile, YellowTile } from 'components';
import { useDroppableSpot } from 'hooks';

const GameBoardWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  td: {
    padding: '1px',
  },
});

const game = new Board();

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
        <GamePiece rowIndex={row} columnIndex={column}/>
      </BrownTile>
    );
  } else if (spot.isPartOfWhiteGoal()) {
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
  const { dropRef, isOver } = useDroppableSpot(props.spot.getLocation());

  return (
    <div ref={dropRef} style={{ border: isOver ? '2px solid' : 'none' }}>
      <GameBoardSpot {...props}/>
    </div>
  );
}

export function GameBoard() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameBoardWrapper>
        <table cellPadding="0" cellSpacing="0">
          <tbody>
            {game.getSpots().map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((spot, columnIndex) => (
                  <td key={columnIndex}>
                    <DropableGameBoardSpot spot={spot}/>
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
