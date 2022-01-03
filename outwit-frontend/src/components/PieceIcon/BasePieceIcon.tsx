import { BasePieceIconProps } from './interface';
import styled from '@emotion/styled';

export default styled.div(({ color }: BasePieceIconProps) => {
  return ({
    height: 'inherit',
    width: 'inherit',
    borderRadius: '50%',
    backgroundColor: color,
  });
});
