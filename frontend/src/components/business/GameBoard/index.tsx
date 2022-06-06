import { useContext } from 'react';
import styled from '@emotion/styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Spot } from 'model';
import { GamePiece, BrownTile, OrangeTile, YellowTile, Box } from 'components';
import { useDroppableSpot } from 'hooks';
import { isTouchDevice } from 'utilities';
import { GameContext } from 'context/game';

const GameBoardWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  td: {
    border: '2px solid',
    display: 'border-box',
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
    <Box ref={dropRef} border={(isOver && canDrop) ? '2px solid' : 'none'}>
      <GameBoardSpot {...props}/>
    </Box>
  );
}

export function GameBoard() {
  const { board } = useContext(GameContext);

  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
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
