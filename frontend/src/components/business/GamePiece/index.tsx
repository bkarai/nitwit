import { useContext } from 'react';

import { GameContext } from 'context/game';
import {
  SimplePiece,
} from 'components';
import { Spot } from 'model';
import { useClickableSpot, useDraggablePiece } from 'hooks';

interface GamePieceProps {
  spot: Spot;
};

export function GamePiece({
  spot
}: GamePieceProps) {
  const { state: { selectedPiece }, board } = useContext(GameContext);

  const thisPiece = spot.getPiece();
  const selectedPieceObject = selectedPiece && board.getPiece(selectedPiece)!;
  const isThisPieceSelected = thisPiece === selectedPieceObject;

  const onClick = useClickableSpot(spot);
  const { dragRef } = useDraggablePiece(thisPiece);

  return spot.isPotentialMove() || thisPiece ? (
    <div ref={dragRef} onClick={onClick} style={{ width: '100%', height: '100%' }}>
      {spot.isPotentialMove() ?
        <SimplePiece isSelected={false} isPower={selectedPieceObject!.isPower()} isMove isWhite={selectedPieceObject!.isWhite()}/> :
        <SimplePiece isSelected={isThisPieceSelected} isPower={thisPiece!.isPower()} isMove={false} isWhite={thisPiece!.isWhite()}/>
      }
    </div>
  ): null;
}
