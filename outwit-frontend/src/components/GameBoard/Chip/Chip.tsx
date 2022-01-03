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
  const pieceCharacterObject = getPieceSingleton(pieceCharacter as PieceString)
  if (pieceCharacterObject.isWhite() && pieceCharacterObject.isStandard()) {
    return <StandardChip isSelected={isSelected} onClick={onClick} variant="white" />
  } else if (pieceCharacterObject.isBlack() && pieceCharacterObject.isStandard()) {
    return <StandardChip isSelected={isSelected} onClick={onClick} variant="black" />
  } else if (pieceCharacterObject.isWhite() && pieceCharacterObject.isPower()) {
    return <PowerChip isSelected={isSelected} onClick={onClick} variant="white" />
  } else if (pieceCharacterObject.isBlack() && pieceCharacterObject.isPower()) {
    return <PowerChip isSelected={isSelected} onClick={onClick} variant="black" />
  } else if (pieceCharacterObject.isMove()) {
    const selectedPieceObject = getPieceSingleton(selectedPiece as PieceString);
    if (selectedPieceObject.isPower()) {
      return <PowerChip isSelected={false} onClick={onClick} variant="move" />
    } else {
      return <StandardChip isSelected={false} onClick={onClick} variant="move" />
    }
  } else {
    return null;
  }
}
