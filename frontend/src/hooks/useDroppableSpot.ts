import { useDrop } from "react-dnd";
import { Board, Coordinate } from "model";
import { useContext } from "react";
import { GameContext } from "context";

export function useDroppableSpot(coordinate: Coordinate) {
  const { state: { board } } = useContext(GameContext);
  const gameBoard = new Board(board);
  const spot = gameBoard.getSpot(coordinate);

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
