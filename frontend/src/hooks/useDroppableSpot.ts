import { useDrop } from "react-dnd";
import { Board, Coordinate } from "model";
import { useContext } from "react";
import { GameContext } from "context";

export function useDroppableSpot(coordinate: Coordinate) {
  const { board } = useContext(GameContext);
  const spot = board.getSpot(coordinate);

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
