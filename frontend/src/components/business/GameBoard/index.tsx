import { useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Spot } from 'model';
import { GamePiece, BrownTile, OrangeTile, YellowTile, Box } from 'components';
import { useDroppableSpot, useIsMobile } from 'hooks';
import { isTouchDevice } from 'utilities';
import { GameContext } from 'context/game';

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
    <Box width='100%' height='100%' ref={dropRef} border={(isOver && canDrop) ? '2px solid' : 'none'}>
      <GameBoardSpot {...props}/>
    </Box>
  );
}

export function GameBoard() {
  const { board } = useContext(GameContext);
  const isMobile = useIsMobile();

  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      <Box display='flex' justifyContent='center' width='100%' height='100%'>
        {board.getSpots().map((row, rowIndex) => (
          <Box height='100%' key={rowIndex}>
            {row.map((spot, columnIndex) => (
              <Box width={isMobile ? '9.6vw' : '55px'} style={{ aspectRatio: isMobile ? '1/1.1' : '1/1' }} border='2px solid' key={columnIndex}>
                <DropableGameBoardSpot spot={spot}/>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </DndProvider>
  );
}
