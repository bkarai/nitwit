import styled from '@emotion/styled';

import {
  OuterCircleProps
} from './interface';

export const OuterCircle = styled.div`
  position: relative;
  height: inherit;
  width: inherit;
  border-radius: 50%;
  background: ${({ background }: OuterCircleProps) => background};
  opacity: ${({ opacity }: OuterCircleProps) => opacity};
`;

export const InnerCircle = styled.div`
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #fae607;
  top: 20px;
  bottom: 20px;
  left: 20px;
  right: 20px;
`;
