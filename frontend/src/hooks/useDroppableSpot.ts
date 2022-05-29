import { useDrop } from "react-dnd";
import { Spot, Piece } from 'model';

export function useDroppableSpot(spot: Spot) {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: 'piece',
    drop: (item: Piece, monitor) => spot.getLocation(),
    canDrop: (item: Piece, monitor) => spot.isPotentialMove(),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }, [spot, spot.isPotentialMove()]);

  return {
    canDrop,
    isOver,
    dropRef,
  };
}
