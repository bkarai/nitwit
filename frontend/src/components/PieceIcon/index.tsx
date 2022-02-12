import styled from '@emotion/styled';
import { BLACK_COLOR, WHITE_COLOR } from 'consts';

interface BasePieceIconProps {
  color: string;
};

const BasePieceIcon = styled.div(({ color }: BasePieceIconProps) => {
  return ({
    height: 'inherit',
    width: 'inherit',
    borderRadius: '50%',
    backgroundColor: color,
  });
});

export function BlackPieceIcon() {
  return (
    <BasePieceIcon color={BLACK_COLOR} />
  );
}

export function WhitePieceIcon() {
  return (
    <BasePieceIcon color={WHITE_COLOR} />
  );
}
