// This code is terrible, it should be refactored

import { useCallback, useContext } from 'react';
import { useDrag } from 'react-dnd';

import { GameContext } from 'context';
import { selectPiece } from 'actions';
import { BasePiece, BaseSpot, Board } from 'model';
import {
  SimplePiece,
} from 'components';

interface ImportChipProps {
  pieceCharacter: string,
  isSelected: boolean,
  selectedPiece?: string,
};

function ImportChip({
  pieceCharacter,
  isSelected,
  selectedPiece,
}: ImportChipProps) {
  const pieceCharacterObject = Board.deserializeCharacter(pieceCharacter);

  if (!pieceCharacterObject) {
    return null;
  } else if ((pieceCharacterObject instanceof BaseSpot) && pieceCharacterObject.isPotentialMove()) {
    const selectedPieceObject = BasePiece.deserialize(selectedPiece as string) as BasePiece;
    return <SimplePiece isSelected={false} isPower={selectedPieceObject.isPower()} isMove isWhite={selectedPieceObject.isWhite()}/>
  } else if (pieceCharacterObject instanceof BasePiece) {
    return  <SimplePiece isSelected={isSelected} isPower={pieceCharacterObject.isPower()} isMove={false} isWhite={pieceCharacterObject.isWhite()}/>;
  } else {
    return null;
  }
}

interface ChipWrapperProps {
  rowIndex: number,
  columnIndex: number,
};

export function GamePiece({
  rowIndex,
  columnIndex,
}: ChipWrapperProps) {
  const gameContext = useContext(GameContext);
  const { state: { board, selectedPiece, currentTurn, userType }, dispatch } = gameContext;
  const gameBoard = new Board(board);
  const spot = gameBoard.getSpot({row: rowIndex, column: columnIndex});
  const pieceCharacter = spot.serialize();
  const pieceObject = gameBoard.getPiece({row: rowIndex, column: columnIndex});

  const selectedPieceObject = selectedPiece && gameBoard.getSpot({row: selectedPiece.row, column: selectedPiece.column});
  const isThisPieceSelected = selectedPiece?.row === rowIndex && selectedPiece?.column === columnIndex;

  const onClick = useCallback(() => dispatch(selectPiece({ row: rowIndex, column: columnIndex })),
  [dispatch, rowIndex, columnIndex]);

  const canDragThisPiece = currentTurn === userType && pieceObject?.color === userType;

  const [{ isDragging }, drag] = useDrag({
    type: 'piece',
    item: pieceObject,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: (monitor) => canDragThisPiece,
  }, [pieceObject, canDragThisPiece]);

  return (
    <div ref={drag} onClick={onClick} style={{ width: '100%', height: '100%' }}>
      <ImportChip pieceCharacter={pieceCharacter} isSelected={isThisPieceSelected} selectedPiece={selectedPieceObject?.serialize()}/>
    </div>
  );
}
