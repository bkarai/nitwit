import { useCallback } from 'react';
import { connect } from 'react-redux';

import { State } from 'store';
import { Chip } from './Chip'
import { selectPiece } from 'actions';
import { Coordinate, Game } from 'model';

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
    <Chip onClick={onClick} pieceCharacter={pieceCharacter} isSelected={isSelected} selectedPiece={selectedPieceObject}/>
  );
}

const mapStateToProps = (state: State): Pick<ChipWrapperProps, 'board' | 'selectedPiece'> => ({
  board: state.board,
  selectedPiece: state.selectedPiece,
})

export default connect(mapStateToProps)(ChipWrapper);
