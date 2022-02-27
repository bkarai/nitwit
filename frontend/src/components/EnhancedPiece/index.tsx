// This code is terrible, it should be refactored

import { useCallback, useContext } from 'react';

import { GameContext } from 'context';
import { selectPiece } from 'actions';
import { BasePiece, BaseSpot, Board } from 'model';
import {
  Piece,
  PieceColor,
} from 'components';

interface ImportChipProps {
  pieceCharacter: string,
  isSelected: boolean,
  selectedPiece: null | string,
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
    return <Piece isSelected={false} isPower={selectedPieceObject.isPower()} isMove color={selectedPieceObject.isWhite() ? PieceColor.WHITE : PieceColor.BLACK}/>
  } else if (pieceCharacterObject instanceof BasePiece) {
    return  <Piece isSelected={isSelected} isPower={pieceCharacterObject.isPower()} color={pieceCharacterObject.isWhite() ? PieceColor.WHITE : PieceColor.BLACK}/>;
  } else {
    return null;
  }
}

interface ChipWrapperProps {
  rowIndex: number,
  columnIndex: number,
};

function ChipWrapper({
  rowIndex,
  columnIndex,
}: ChipWrapperProps) {
  const gameContext = useContext(GameContext);
  const { state: { board, selectedPiece }, dispatch } = gameContext;
  const gameBoard = new Board();
  gameBoard.configure(board);
  const pieceCharacter = gameBoard.getSpot(rowIndex, columnIndex).serialize();

  let selectedPieceObject = null;
  if ((selectedPiece?.row !== undefined) && (selectedPiece?.column !== undefined)) {
    selectedPieceObject = gameBoard.getSpot(selectedPiece.row, selectedPiece.column).serialize();
  }
  const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.column === columnIndex;

  const onClick = useCallback(() => dispatch(selectPiece({ row: rowIndex, column: columnIndex })),
  [dispatch, rowIndex, columnIndex]);

  return (
    <div onClick={onClick} style={{ width: '100%', height: '100%' }}>
      <ImportChip pieceCharacter={pieceCharacter} isSelected={isSelected} selectedPiece={selectedPieceObject}/>
    </div>
  );
}

export const EnhancedPiece = ChipWrapper;
