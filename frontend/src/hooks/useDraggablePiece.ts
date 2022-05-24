import { useContext, useEffect } from "react";
import { useDrag } from "react-dnd";
import { GameContext, selectPiece } from "context/game";
import { Piece } from 'model';

export function useDraggablePiece(piece: Piece) {
  const { state: { currentTurn, userType }, selectedPiece, dispatch } = useContext(GameContext);

  const isThisPieceSelected = selectedPiece === piece;
  const canDragThisPiece = currentTurn === userType && piece.color === userType && (!selectedPiece || isThisPieceSelected);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'piece',
    item: piece,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: (monitor) => canDragThisPiece,
  }, [piece, canDragThisPiece]);

  useEffect(() => {
    if (isDragging && !selectedPiece) {
      dispatch(selectPiece(piece.getSpot().getLocation()));
    }
  }, [isDragging, dispatch, selectedPiece, piece.getSpot().getLocation()]);

  return {
    isDragging,
    dragRef,
  };
}
