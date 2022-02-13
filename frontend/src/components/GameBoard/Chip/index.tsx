import { useCallback } from 'react';
import { connect } from 'react-redux';
import { Chip } from './Chip'
import { selectPiece } from 'actions';
import { Game } from 'model';

interface ChipWrapperProps {
  pieces: string,
  rowIndex: number,
  columnIndex: number,
  selectedPiece: { row: number | null, column: number | null },
  dispatch: any
};

function ChipWrapper({
  pieces,
  rowIndex,
  columnIndex,
  selectedPiece,
  dispatch,
}: ChipWrapperProps) {
  const board = new Game(pieces);
  const pieceCharacter = board.getSpot(rowIndex, columnIndex).serialize();

  let selectedPieceObject = null;
  if ((selectedPiece.row !== null) && (selectedPiece.column !== null)) {
    selectedPieceObject = board.getSpot(selectedPiece.row, selectedPiece.column).serialize();
  }
  const isSelected = selectedPiece.row === rowIndex && selectedPiece.column === columnIndex;

  const onClick = useCallback(() => dispatch(selectPiece({ row: rowIndex, column: columnIndex })),
  [dispatch, rowIndex, columnIndex]);

  const onHover = useCallback(() => {}, []);

  return (
    <Chip onClick={onClick} onHover={onHover} pieceCharacter={pieceCharacter} isSelected={isSelected} selectedPiece={selectedPieceObject}/>
  );
}

const mapStateToProps = (state: any) => ({
  pieces: state.board,
  selectedPiece: state.selectedPiece,
})

export default connect(mapStateToProps)(ChipWrapper);
