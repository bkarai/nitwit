import { useDrop } from "react-dnd";
import { Spot } from 'model';

export function useDroppableSpot(spot: Spot) {
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
