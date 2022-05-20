import {
  Circle,
  CenterAlignChild,
} from 'components';

enum PieceColor {
  WHITE = '#FFFDD0',
  BLACK = '#654321',
};

const INNER_CIRCLE_COLOR = '#FAE607';
const MOVE_COLOR = '#EBEBEE';

interface PieceProps {
  isWhite: boolean;
  isSelected: boolean;
  isMove: boolean;
  isPower: boolean;
};

export function SimplePiece({
  isWhite,
  isSelected,
  isMove,
  isPower,
}: PieceProps) {
  const color = isWhite ? PieceColor.WHITE : PieceColor.BLACK;

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
