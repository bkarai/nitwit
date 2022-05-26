import { useContext } from 'react';
import Box from '@mui/material/Box';
import { GameContext } from 'context/game';
import { SimplePiece } from 'components';
import { PieceColor } from 'model';

interface GameStatusNetworkGameProps {
  userType: PieceColor;
  isMyTurn: boolean;
}

function GameStatusNetworkGame({
  userType,
  isMyTurn
}: GameStatusNetworkGameProps) {
  return (
    <Box display="flex" justifyContent="center" height='100%'>
      <Box width="50%" border="4px solid" display='flex' justifyContent="center" alignItems="center">
        <span>
          You are &nbsp;
        </span>
        <Box display='inline-block' height="40px" width="40px">
          <SimplePiece isWhite={userType === PieceColor.WHITE} isSelected={false} isMove={false} isPower={false}/>
        </Box>
      </Box>
      <Box width="50%" border="4px solid" display='flex' justifyContent="center" alignItems="center">
        {isMyTurn ? (
          <span>It is your turn!</span>
        ): (
          <>
            <span>Waiting for &nbsp;</span>
            <Box display='inline-block' height="40px" width="40px">
              <SimplePiece isWhite={userType !== PieceColor.WHITE} isSelected={false} isMove={false} isPower={false}/>
            </Box>
            <span>&nbsp; to make their move</span>
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
    <Box border="4px solid" display='flex' justifyContent="center" alignItems="center" height="100%">
      <span className='lead fw-bold'>
        {thisUserWon ? 'You win!' : 'You lost!'}
      </span>
    </Box>
  );
}

function GameStatusContent() {
  const { state: { winner, currentTurn, userType } } = useContext(GameContext);

  if (winner) {
    return <GameOverNetworkGame thisUserWon={userType === winner}/>
  } else {
    return <GameStatusNetworkGame userType={userType!} isMyTurn={userType === currentTurn}/>
  }
};

export function GameStatus() {
  return (
    <Box sx={{
      px: '10vw',
    }}>
      <Box className='bg-primary' sx={{
        height: '50px',
      }}>
        <GameStatusContent />
      </Box>
    </Box>
  )
}
