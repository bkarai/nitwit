import React from "react";
import styled from '@emotion/styled';

interface SquareProps {
  $size: number,
  $color: string,
  children: React.ReactNode,
};

export const SquareContainer = styled.div(({ $size, $color}: SquareProps) => ({
  height: `${$size}px`,
  width: `${$size}px`,
  backgroundColor: $color,
}));

export function Square(props: SquareProps) {
  return (
    <SquareContainer {...props}>
      {props.children}
    </SquareContainer>
  );
}
