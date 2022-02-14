import React from "react";

import {
  BasePiece,
  BaseSpot,
  Game,
} from 'model';

import {
  OuterCircle,
  InnerCircle,
} from './styles';

const WHITE_COLOR = '#FFFDD0';
const BLACK_COLOR = '#654321';
const MOVE_COLOR = '#EBEBEE';

type onMouseEvent = (event: React.MouseEvent<HTMLElement>) => void;

enum ChipVariant {
  WHITE,
  BLACK,
  MOVE,
};

const VARIANT_COLOR_MAP: { [key in ChipVariant]: string } = {
  [ChipVariant.WHITE]: WHITE_COLOR,
  [ChipVariant.BLACK]: BLACK_COLOR,
  [ChipVariant.MOVE]: MOVE_COLOR,
};

interface ChipPresenterProps {
  variant: ChipVariant;
  isSelected: boolean;
  isPower: boolean;
  onClick: onMouseEvent;
};

function ChipPresenter({
  variant,
  isSelected,
  isPower,
  onClick,
}: ChipPresenterProps) {
  return (
    <div style={{ height: '100%', width: '100%' }} onClick={onClick}>
      <OuterCircle background={VARIANT_COLOR_MAP[variant]} opacity={isSelected ? '0.5' : 'initial'}>
        {isPower ? <InnerCircle /> : null}
      </OuterCircle>
    </div>
  );
}

interface ChipProps {
  pieceCharacter: string,
  isSelected: boolean,
  selectedPiece: null | string,
  onClick: onMouseEvent,
};

export function Chip({
  pieceCharacter,
  isSelected,
  onClick,
  selectedPiece,
}: ChipProps) {
  const pieceCharacterObject = Game.deserializeCharacter(pieceCharacter);

  if (!pieceCharacterObject) {
    return null;
  } else if ((pieceCharacterObject instanceof BaseSpot) && pieceCharacterObject.isPotentialMove()) {
    const selectedPieceObject = BasePiece.deserialize(selectedPiece as string) as BasePiece;
    return <ChipPresenter isSelected={false} onClick={onClick} isPower={selectedPieceObject.isPower()} variant={ChipVariant.MOVE}/>
  } else if (pieceCharacterObject instanceof BasePiece) {
    const variant = pieceCharacterObject.isBlack() ? ChipVariant.BLACK : ChipVariant.WHITE;
    return  <ChipPresenter isSelected={isSelected} onClick={onClick} isPower={pieceCharacterObject.isPower()} variant={variant}/>;
  } else {
    return null;
  }
}
