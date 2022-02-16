import styled from '@emotion/styled';

export interface CircleProps {
  background: string;
  opacity?: string;
  radius?: string;
};

export const Circle = styled.div(({ background, opacity, radius = 'inherit' }: CircleProps) => ({
  position: 'relative',
  height: radius,
  width: radius,
  borderRadius: '50%',
  background,
  opacity: opacity || 'initial',
}));
