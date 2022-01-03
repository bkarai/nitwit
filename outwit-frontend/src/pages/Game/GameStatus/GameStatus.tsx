import { GameStatusProps } from './interface';
import { WhitePieceIcon, BlackPieceIcon } from 'components';

export default function GameStatus(props: GameStatusProps) {
  return (
    <div>
      <div style={{ height: '50px', width: '50px' }}>
        {props.isWhiteTurn ? <WhitePieceIcon /> : <BlackPieceIcon />}
      </div>
      <p>
        {props.winner ? `The winner is ${props.winner}` : 'No winner declared yet'}
      </p>
    </div>
  );
}
