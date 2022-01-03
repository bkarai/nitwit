import {
  SquareProps
} from './interface';

import {
  SquareContainer
} from './styles';

export default function Square(props: SquareProps) {
  return (
    <SquareContainer {...props}>
      {props.children}
    </SquareContainer>
  );
}
