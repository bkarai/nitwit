import { useContext, useEffect } from "react";
import { useDrag } from "react-dnd";
import { GameContext, selectPiece } from "context/game";
import { Piece, Coordinate } from 'model';

export function useDraggablePiece(piece: Piece) {
  const { state: { currentTurn, userType, isLocalGame }, selectedPiece, dispatch } = useContext(GameContext);

  const isThisPieceSelected = selectedPiece === piece;

  const currentTurnMatchesPiece = piece.color === currentTurn;
  const userOwnsThisPiece = isLocalGame ? currentTurnMatchesPiece : (currentTurnMatchesPiece && (currentTurn === userType));

  const canDragThisPiece = userOwnsThisPiece && (!selectedPiece || isThisPieceSelected);
  const pieceLocation = piece.getSpot().getLocation();

  const [{ isDragging, canDrag }, dragRef] = useDrag({
    type: 'piece',
    item: piece,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: canDragThisPiece,
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
    canDrag,
  };
}
