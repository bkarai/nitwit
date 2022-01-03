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
  getPieceSingleton,
  PieceString,
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
  onClick,
  isSelected,
}: StandardChipProps) {
  return (
    <OuterCircle onClick={onClick} background={variantMap[variant]} opacity={isSelected ? '0.5' : 'initial'}/>
  );
}

function PowerChip({
  variant,
  onClick,
  isSelected,
}: PowerChipProps) {
  return (
    <OuterCircle onClick={onClick} background={variantMap[variant]} opacity={isSelected ? '0.5' : 'initial'}>
      <InnerCircle />
    </OuterCircle>
  );
}

export default function Chip({
  pieceCharacter,
  isSelected,
  onClick,
  selectedPiece,
}: ChipProps) {
  const pieceCharacterObject = getPieceSingleton(pieceCharacter as PieceString);

  if (pieceCharacterObject.isEmpty()) {
    return null;
  } else if (pieceCharacterObject.isMove()) {
    const selectedPieceObject = getPieceSingleton(selectedPiece as PieceString);
    const Component = selectedPieceObject.isPower() ? PowerChip : StandardChip;
    return <Component isSelected={false} onClick={onClick} variant='move'/>
  } else {
    const Component = pieceCharacterObject.isPower() ? PowerChip : StandardChip;
    const variant = pieceCharacterObject.isBlack() ? 'black' : 'white';
    return <Component isSelected={isSelected} onClick={onClick} variant={variant}/>
  }
}
