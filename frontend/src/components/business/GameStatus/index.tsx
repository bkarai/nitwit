import { useContext } from 'react';
import { GameContext } from 'context/game';
import { Box, SimplePiece } from 'components';
import { PieceColor } from 'model';
import { useIsMobile } from 'hooks';

interface GameStatusLocalGameProps {
  currentTurn: PieceColor
}

function GameStatusLocalGame({
  currentTurn
}: GameStatusLocalGameProps) {
  return (
    <Box display='flex' justifyContent="center" alignItems="center" height="100%">
        <h2>
          It's now {currentTurn === PieceColor.WHITE ? "white's" : "black's"} &nbsp;
        </h2>
        <Box display='inline-block' height="40px" width="40px">
          <SimplePiece isWhite={currentTurn === PieceColor.WHITE} isSelected={false} isMove={false} isPower={false}/>
        </Box>
        <h2>
          &nbsp; turn
        </h2>
    </Box>
  )
}

interface GameStatusNetworkGameProps {
  userType: PieceColor;
  isMyTurn: boolean;
}

function GameStatusNetworkGame({
  userType,
  isMyTurn
}: GameStatusNetworkGameProps) {
  const isMobile = useIsMobile();
  return (
    <Box display="flex" justifyContent="center" height='100%' flexDirection='column'>
      <Box display='flex' justifyContent="center" alignItems="center">
        <h2>
          You are &nbsp;
        </h2>
        <Box display='inline-block' height="40px" width="40px">
          <SimplePiece isWhite={userType === PieceColor.WHITE} isSelected={false} isMove={false} isPower={false}/>
        </Box>
      </Box>
      <Box display='flex' justifyContent="center" alignItems="center">
        {isMyTurn ? (
          <h2>It is your turn!</h2>
        ): (
          <>
            <h2>Waiting for &nbsp;</h2>
            <Box display='inline-block' height="40px" width="40px">
              <SimplePiece isWhite={userType !== PieceColor.WHITE} isSelected={false} isMove={false} isPower={false}/>
            </Box>
            {!isMobile && <h2>&nbsp; to make their move</h2>}
          </>
        )}
      </Box>
    </Box>
  )
}


interface GameOverNetworkGameProps {
  thisUserWon: boolean;
}

function GameOverNetworkGame({
  thisUserWon
}: GameOverNetworkGameProps) {
  return (
    <Box display='flex' justifyContent="center" alignItems="center" height="100%">
      <h2>
        {thisUserWon ? 'You win!' : 'You lost!'}
      </h2>
    </Box>
  );
}

interface GameOverLocalGameProps {
  winner: PieceColor;
}

function GameOverLocalGame({
  winner
}: GameOverLocalGameProps) {
  return (
    <Box display='flex' justifyContent="center" alignItems="center" height="100%">
      <h2>
        {winner === PieceColor.WHITE ? "White" : "Black"} &nbsp;
      </h2>
      <Box display='inline-block' height="40px" width="40px">
        <SimplePiece isWhite={winner === PieceColor.WHITE} isSelected={false} isMove={false} isPower={false}/>
      </Box>
      <h2>
        &nbsp; wins!
      </h2>
    </Box>
  );
}

function GameStatusContent() {
  const { state: { winner, currentTurn, userType, isLocalGame } } = useContext(GameContext);

  if (isLocalGame) {
    if (winner) {
      return <GameOverLocalGame winner={winner} />
    } else {
      return <GameStatusLocalGame currentTurn={currentTurn}/>
    }
  } else {
    if (winner) {
      return <GameOverNetworkGame thisUserWon={userType === winner}/>
    } else {
      return <GameStatusNetworkGame userType={userType!} isMyTurn={userType === currentTurn}/>
    }
  }
};

export function GameStatus() {
  return (
    <Box sx={{
      px: '10vw',
      py: '2vh'
    }}>
      <GameStatusContent />
    </Box>
  )
}
