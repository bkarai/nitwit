import { useCallback, useContext } from 'react';
import { useDrag } from 'react-dnd';

import { GameContext } from 'context';
import { selectPiece } from 'actions';
import { Board } from 'model';
import {
  SimplePiece,
} from 'components';

interface GamePieceProps {
  rowIndex: number,
  columnIndex: number,
};

export function GamePiece({
  rowIndex,
  columnIndex,
}: GamePieceProps) {
  const gameContext = useContext(GameContext);
  const { state: { board, selectedPiece, currentTurn, userType }, dispatch } = gameContext;

  const gameBoard = new Board(board);
  const thisSpot = gameBoard.getSpot({row: rowIndex, column: columnIndex});
  const thisPiece = gameBoard.getPiece({row: rowIndex, column: columnIndex});

  const selectedPieceObject = selectedPiece && gameBoard.getPiece({row: selectedPiece.row, column: selectedPiece.column})!;
  const isThisPieceSelected = selectedPiece?.row === rowIndex && selectedPiece?.column === columnIndex;

  const onClick = useCallback(() => dispatch(selectPiece({ row: rowIndex, column: columnIndex })),
  [dispatch, rowIndex, columnIndex]);

  const canDragThisPiece = currentTurn === userType && thisPiece?.color === userType;

  const [{ isDragging }, drag] = useDrag({
    type: 'piece',
    item: thisPiece,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: (monitor) => canDragThisPiece,
  }, [thisPiece, canDragThisPiece]);

  return thisSpot.isPotentialMove() || thisPiece ? (
    <div ref={drag} onClick={onClick} style={{ width: '100%', height: '100%' }}>
      {thisSpot.isPotentialMove() ?
        <SimplePiece isSelected={false} isPower={selectedPieceObject!.isPower()} isMove isWhite={selectedPieceObject!.isWhite()}/> :
        <SimplePiece isSelected={isThisPieceSelected} isPower={thisPiece!.isPower()} isMove={false} isWhite={thisPiece!.isWhite()}/>
      }
    </div>
  ): null;
}
