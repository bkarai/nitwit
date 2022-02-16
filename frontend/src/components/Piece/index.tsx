import styled from '@emotion/styled';

import {
  Circle,
  CenterAlignChild,
} from 'components';

export enum PieceColor {
  WHITE = '#FFFDD0',
  BLACK = '#654321',
};

const INNER_CIRCLE_COLOR = '#FAE607';
const MOVE_COLOR = '#EBEBEE';

interface PieceProps {
  color: PieceColor;
  isSelected: boolean;
  isMove?: boolean;
  isPower?: boolean;
};

export function Piece({
  color,
  isSelected,
  isMove,
  isPower,
}: PieceProps) {
  return (
    <Circle background={isMove ? MOVE_COLOR : color} opacity={isSelected ? '0.5' : undefined}>
      {isPower && (
        <CenterAlignChild>
          <Circle background={INNER_CIRCLE_COLOR} radius='25%'/>
        </CenterAlignChild>
      )}
    </Circle>
  );
}
