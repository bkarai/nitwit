import { useContext } from 'react';

import { GameContext } from 'context';
import { Board } from 'model';
import {
  SimplePiece,
} from 'components';
import { useClickablePiece, useDraggablePiece } from 'hooks';

interface GamePieceProps {
  rowIndex: number,
  columnIndex: number,
};

export function GamePiece({
  rowIndex,
  columnIndex,
}: GamePieceProps) {
  const gameContext = useContext(GameContext);
  const { state: { board, selectedPiece }, dispatch } = gameContext;

  const gameBoard = new Board(board);
  const thisSpot = gameBoard.getSpot({row: rowIndex, column: columnIndex});
  const thisPiece = gameBoard.getPiece({row: rowIndex, column: columnIndex});

  const selectedPieceObject = selectedPiece && gameBoard.getPiece({row: selectedPiece.row, column: selectedPiece.column})!;
  const isThisPieceSelected = selectedPiece?.row === rowIndex && selectedPiece?.column === columnIndex;

  const onClick = useClickablePiece({ row: rowIndex, column: columnIndex });
  const { isDragging, dragRef } = useDraggablePiece({ row: rowIndex, column: columnIndex });

  return thisSpot.isPotentialMove() || thisPiece ? (
    <div ref={dragRef} onClick={onClick} style={{ width: '100%', height: '100%' }}>
      {thisSpot.isPotentialMove() ?
        <SimplePiece isSelected={false} isPower={selectedPieceObject!.isPower()} isMove isWhite={selectedPieceObject!.isWhite()}/> :
        <SimplePiece isSelected={isThisPieceSelected} isPower={thisPiece!.isPower()} isMove={false} isWhite={thisPiece!.isWhite()}/>
      }
    </div>
  ): null;
}
