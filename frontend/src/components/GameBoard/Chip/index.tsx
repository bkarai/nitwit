import { useCallback } from 'react';
import { connect } from 'react-redux';
import Chip from './Chip'
import { selectPiece, hoverPiece } from 'actions';
import { Board } from 'model/Board';

import {
  ChipWrapperProps
} from './interface';

function ChipWrapper({
  pieces,
  rowIndex,
  columnIndex,
  selectedPiece,
  dispatch,
}: ChipWrapperProps) {
  const board = new Board(pieces);
  const pieceCharacter = board.getPiece(rowIndex, columnIndex).getType();

  let selectedPieceObject = null;
  if ((selectedPiece.row !== null) && (selectedPiece.column !== null)) {
    selectedPieceObject = board.getPiece(selectedPiece.row, selectedPiece.column).getType();
  }
  const isSelected = selectedPiece.row === rowIndex && selectedPiece.column === columnIndex;

  const onClick = useCallback(() => dispatch(selectPiece({ row: rowIndex, column: columnIndex })),
  [dispatch, rowIndex, columnIndex]);

  const onHover = useCallback(() => dispatch(hoverPiece({ row: rowIndex, column: columnIndex })), [dispatch, rowIndex, columnIndex]);

  return (
    <Chip onClick={onClick} onHover={onHover} pieceCharacter={pieceCharacter} isSelected={isSelected} selectedPiece={selectedPieceObject}/>
  );
}

const mapStateToProps = (state: any) => ({
  pieces: state.board,
  selectedPiece: state.selectedPiece,
})

export default connect(mapStateToProps)(ChipWrapper);
