import { connect } from 'react-redux';
import { State } from 'store';

import { GameStatusWrapperProps } from './interface';
import GameStatus from './GameStatus';

function GameStatusWrapper(props: GameStatusWrapperProps) {
  return (
    <GameStatus {...props}/>
  );
}

const mapStateToProps = (state: State) => ({
  userType: state.userType,
  ready: state.ready,
  winner: state.winner,
  isWhiteTurn: state.isWhiteTurn,
})

export default connect(mapStateToProps)(GameStatusWrapper);
