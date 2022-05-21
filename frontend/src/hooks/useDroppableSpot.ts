import { useDrop } from "react-dnd";
import { useContext } from "react";
import { GameContext } from "context";

export function useDroppableSpot(row: number, column: number) {
  const { board } = useContext(GameContext);
  const spot = board.getSpot({ row, column });

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: 'piece',
    drop: () => spot,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: spot.isPotentialMove(),
    })
  }, [spot, spot.isPotentialMove()]);

  return {
    canDrop,
    isOver,
    dropRef,
  };
}
