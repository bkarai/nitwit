import { useContext, useEffect } from "react";
import { useDrag } from "react-dnd";
import { GameContext } from "context/game";
import { selectPiece } from "context/game";

export function useDraggablePiece(row: number, column: number) {
  const { state: { currentTurn, userType, selectedPiece }, board, dispatch } = useContext(GameContext);

  const thisPiece = board.getPiece({ row, column });
  const isThisPieceSelected = !!(selectedPiece && board.getPiece(selectedPiece) === thisPiece);
  const canDragThisPiece = currentTurn === userType && thisPiece?.color === userType && (!selectedPiece || isThisPieceSelected);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'piece',
    item: thisPiece,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: (monitor) => canDragThisPiece,
  }, [thisPiece, canDragThisPiece]);

  useEffect(() => {
    if (isDragging && !selectedPiece) {
      dispatch(selectPiece({ row, column }));
    }
  }, [isDragging, dispatch, selectedPiece, row, column]);

  return {
    isDragging,
    dragRef,
  };
}
