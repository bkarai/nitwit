import { useContext, useEffect } from "react";
import { useDrag } from "react-dnd";
import { GameContext } from "context";
import { selectPiece } from "actions";

export function useDraggablePiece(row: number, column: number) {
  const { state: { currentTurn, userType }, board, dispatch } = useContext(GameContext);

  const thisPiece = board.getPiece({ row, column });
  const canDragThisPiece = currentTurn === userType && thisPiece?.color === userType;

  const [{ isDragging }, dragRef] = useDrag({
    type: 'piece',
    item: thisPiece,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: (monitor) => canDragThisPiece,
  }, [thisPiece, canDragThisPiece]);

  useEffect(() => {
    if (isDragging) {
      dispatch(selectPiece({ row, column }));
    }
  }, [isDragging, dispatch, row, column]);

  return {
    isDragging,
    dragRef,
  };
}
