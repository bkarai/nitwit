// This code is terrible, it should be refactored

import { useCallback } from 'react';
import { connect } from 'react-redux';

import { State } from 'store';
import { selectPiece } from 'actions';
import { BasePiece, BaseSpot, Coordinate, Game } from 'model';
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
  const pieceCharacterObject = Game.deserializeCharacter(pieceCharacter);

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
  board: string,
  rowIndex: number,
  columnIndex: number,
  selectedPiece: Coordinate | null,
  dispatch: any
};

function ChipWrapper({
  board,
  rowIndex,
  columnIndex,
  selectedPiece,
  dispatch,
}: ChipWrapperProps) {
  const game = new Game(board);
  const pieceCharacter = game.getSpot(rowIndex, columnIndex).serialize();

  let selectedPieceObject = null;
  if ((selectedPiece?.row !== undefined) && (selectedPiece?.column !== undefined)) {
    selectedPieceObject = game.getSpot(selectedPiece.row, selectedPiece.column).serialize();
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

const mapStateToProps = (state: State): Pick<ChipWrapperProps, 'board' | 'selectedPiece'> => ({
  board: state.board,
  selectedPiece: state.selectedPiece,
})

export const EnhancedPiece = connect(mapStateToProps)(ChipWrapper);
