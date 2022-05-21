import { useContext } from "react";
import { useDrag } from "react-dnd";
import { Board, Coordinate } from "model";
import { GameContext } from "context";

export function useDraggablePiece(pieceCoordinate: Coordinate) {
  const { state: { currentTurn, userType }, board: gameBoard } = useContext(GameContext);

  const thisPiece = gameBoard.getPiece(pieceCoordinate);
  const canDragThisPiece = currentTurn === userType && thisPiece?.color === userType;

  const [{ isDragging }, dragRef] = useDrag({
    type: 'piece',
    item: thisPiece,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: (monitor) => canDragThisPiece,
  }, [thisPiece, canDragThisPiece]);

  return {
    isDragging,
    dragRef,
  };
}
