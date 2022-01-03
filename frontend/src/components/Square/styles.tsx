import styled from '@emotion/styled';

import {
  SquareProps
} from './interface';

export const SquareContainer = styled.div(({ $size, $color}: SquareProps) => ({
  height: `${$size}px`,
  width: `${$size}px`,
  backgroundColor: $color,
}));
