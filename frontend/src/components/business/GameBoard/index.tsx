import styled from '@emotion/styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Spot } from 'model';
import { GamePiece, BrownTile, OrangeTile, YellowTile } from 'components';
import { useDroppableSpot } from 'hooks';
import { useContext } from 'react';
import { GameContext } from 'context/game';

const GameBoardWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  td: {
    padding: '1px',
  },
});

interface GameBoardSpotProps {
  spot: Spot;
};

function GameBoardSpot({
  spot
}: GameBoardSpotProps) {
  const piece = <GamePiece spot={spot} />

  if (spot.isPartOfBlackGoal()) {
    return (
      <BrownTile>
        {piece}
      </BrownTile>
    );
  } else if (spot.isPartOfWhiteGoal()) {
    return (
      <YellowTile>
        {piece}
      </YellowTile>
    );
  } else {
    return (
      <OrangeTile>
        {piece}
      </OrangeTile>
    );
  }
};

function DropableGameBoardSpot(props: GameBoardSpotProps) {
  const { dropRef, isOver, canDrop } = useDroppableSpot(props.spot);

  return (
    <div ref={dropRef} style={{ border: (isOver && canDrop) ? '2px solid' : 'none' }}>
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
