import {
  StandardChipProps,
  PowerChipProps,
  ChipProps,
} from './interface';

import {
  OuterCircle,
  InnerCircle,
} from './styles';

import {
  PieceString,
  Piece,
} from 'model/Piece';

import {
  WHITE_COLOR,
  BROWN_COLOR,
  MOVE_COLOR,
} from 'consts';

const variantMap = {
  white: WHITE_COLOR,
  black: BROWN_COLOR,
  move: MOVE_COLOR,
};

function StandardChip({
  variant,
  isSelected,
}: StandardChipProps) {
  return (
    <OuterCircle background={variantMap[variant]} opacity={isSelected ? '0.5' : 'initial'}/>
  );
}

function PowerChip({
  variant,
  isSelected,
}: PowerChipProps) {
  return (
    <OuterCircle background={variantMap[variant]} opacity={isSelected ? '0.5' : 'initial'}>
      <InnerCircle />
    </OuterCircle>
  );
}

export default function Chip({
  pieceCharacter,
  isSelected,
  onClick,
  onHover,
  selectedPiece,
}: ChipProps) {
  const pieceCharacterObject = new Piece(pieceCharacter as PieceString);

  if (pieceCharacterObject.isEmpty()) {
    return null;
  } else if (pieceCharacterObject.isMove()) {
    const selectedPieceObject = new Piece(selectedPiece as PieceString);
    const Component = selectedPieceObject.isPower() ? PowerChip : StandardChip;
    return <div style={{ height: '100%', width: '100%' }} onClick={onClick} onMouseOver={onHover}> <Component isSelected={false} variant='move'/> </div>;
  } else {
    const Component = pieceCharacterObject.isPower() ? PowerChip : StandardChip;
    const variant = pieceCharacterObject.isBlack() ? 'black' : 'white';
    return <div style={{ width: '100%', height: '100%' }} onClick={onClick} onMouseOver={onHover}> <Component isSelected={isSelected} variant={variant}/> </div>;
  }
}
