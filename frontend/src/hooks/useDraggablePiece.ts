import { useContext, useEffect } from "react";
import { useDrag } from "react-dnd";
import { GameContext, selectPiece } from "context/game";
import { Piece, Coordinate } from 'model';

export function useDraggablePiece(piece: Piece) {
  const { state: { currentTurn, userType }, selectedPiece, dispatch } = useContext(GameContext);

  const isThisPieceSelected = selectedPiece === piece;
  const canDragThisPiece = currentTurn === userType && piece.color === userType && (!selectedPiece || isThisPieceSelected);
  const pieceLocation = piece.getSpot().getLocation();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'piece',
    item: piece,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: (monitor) => canDragThisPiece,
    end: (item: Piece, monitor) => {
      if (monitor.didDrop()) {
        const droppedLocation = monitor.getDropResult() as Coordinate;
        dispatch(selectPiece(droppedLocation));
      }
    }
  }, [piece, canDragThisPiece, dispatch]);

  useEffect(() => {
    if (isDragging && !selectedPiece) {
      dispatch(selectPiece(pieceLocation));
    }
  }, [isDragging, dispatch, selectedPiece, pieceLocation]);

  return {
    isDragging,
    dragRef,
  };
}
