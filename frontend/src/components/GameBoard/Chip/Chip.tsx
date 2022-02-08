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
  BasePiece,
  BaseSpot,
  Game,
} from 'model';

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
  const pieceCharacterObject = Game.deserializeCharacter(pieceCharacter);

  if (!pieceCharacterObject) {
    return null;
  } else if ((pieceCharacterObject instanceof BaseSpot) && pieceCharacterObject.isPotentialMove()) {
    const selectedPieceObject = BasePiece.deserialize(selectedPiece as string) as BasePiece;
    const Component = selectedPieceObject.isPower() ? PowerChip : StandardChip;
    return <div style={{ height: '100%', width: '100%' }} onClick={onClick} onMouseOver={onHover}> <Component isSelected={false} variant='move'/> </div>;
  } else if (pieceCharacterObject instanceof BasePiece) {
    const Component = pieceCharacterObject.isPower() ? PowerChip : StandardChip;
    const variant = pieceCharacterObject.isBlack() ? 'black' : 'white';
    return <div style={{ width: '100%', height: '100%' }} onClick={onClick} onMouseOver={onHover}> <Component isSelected={isSelected} variant={variant}/> </div>;
  } else {
    return null;
  }
}
