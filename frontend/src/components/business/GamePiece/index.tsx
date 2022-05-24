import { useContext } from 'react';

import { GameContext } from 'context/game';
import {
  SimplePiece,
} from 'components';
import { Piece, Spot } from 'model';
import { useClickableSpot, useDraggablePiece } from 'hooks';

interface DraggablePieceProps {
  piece: Piece;
};

function DraggablePiece({
  piece
}: DraggablePieceProps) {
  const { selectedPiece } = useContext(GameContext);
  const isThisPieceSelected = piece === selectedPiece;

  const onClick = useClickableSpot(piece.getSpot());
  const { dragRef } = useDraggablePiece(piece);

  return (
    <div ref={dragRef} onClick={onClick} style={{ width: '100%', height: '100%' }}>
      <SimplePiece isSelected={isThisPieceSelected} isPower={piece.isPower()} isMove={false} isWhite={piece.isWhite()}/>
    </div>
  );
}

interface MovePieceProps {
  spot: Spot;
}

function MovePiece({
  spot
}: MovePieceProps) {
  // Not a real piece! It just looks like one.
  const { selectedPiece } = useContext(GameContext);
  const onClick = useClickableSpot(spot);

  return (
    <div onClick={onClick} style={{ width: '100%', height: '100%' }}>
      <SimplePiece isSelected={false} isPower={selectedPiece!.isPower()} isMove isWhite={selectedPiece!.isWhite()}/>
    </div>
  );
}

interface GamePieceProps {
  spot: Spot;
};

export function GamePiece({
  spot
}: GamePieceProps) {
  const piece = spot.getPiece();

  if (piece) {
    return <DraggablePiece piece={piece}/>;
  } else if (spot.isPotentialMove()) {
    return <MovePiece spot={spot}/>;
  } else {
    return null;
  }
}
