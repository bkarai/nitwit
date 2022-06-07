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

interface SimplePieceProps {
  isWhite: boolean;
  isSelected: boolean;
  isMove: boolean;
  isPower: boolean;
  circleProps?: Partial<React.ComponentProps<typeof Circle>>;
};

export function SimplePiece({
  isWhite,
  isSelected,
  isMove,
  isPower,
  circleProps = {},
}: SimplePieceProps) {
  const color = isWhite ? PieceColor.WHITE : PieceColor.BLACK;

  return (
    <Circle background={isMove ? MOVE_COLOR : color} opacity={isSelected ? '0.5' : undefined} {...circleProps}>
      {isPower && (
        <CenterAlignChild>
          <Circle background={INNER_CIRCLE_COLOR} radius='25%'/>
        </CenterAlignChild>
      )}
    </Circle>
  );
}
