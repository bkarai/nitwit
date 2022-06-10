import styled from '@emotion/styled';
import { ContentWrapper, Button, Box } from "components";
import initialSetupImage from 'assets/instructions/initial-setup.png';
import standardPieceMoves from 'assets/instructions/standard-piece-moves.png';
import powerPieceMoves from 'assets/instructions/power-piece-moves.png';
import turn from 'assets/instructions/turn.png';
import objective from 'assets/instructions/objective.png';
import moveInGoal from 'assets/instructions/move-in-goal.png';
import gameOver from 'assets/instructions/game-over.png';

const InstructionImage = styled.img({
  maxWidth: '100%',
  maxHeight: '50vh',
  height: 'auto',
});

interface InstructionsProps {
  onClose?: () => void;
};

export function Instructions({
  onClose,
}: InstructionsProps) {
  return (
    <ContentWrapper>
      <h1>How to Play Nitwit</h1>
      <Box>
        <Box className="mt-4">
          <h2 className="mt-4">
            Starting Out
          </h2>
          <p className="lead">Nitwit is a game of strategy that is played with two players. Each player has nine pieces which they can control. A player is designated as white or black and may only move the corresponding pieces. The objective is to be the first player to move all of their pieces into the goal, which are the nine squares at the top left corner for black, and the nine squares at the bottom right for white.</p>
          <InstructionImage alt="Initial game board setup" className="mt-2" src={initialSetupImage} />
        </Box>
        <Box className="mt-4">
          <h2>
            Moving Your Pieces
          </h2>
          <p className="lead">Players alternate taking turns and a turn is finished when a piece is moved. Each piece is restricted in where it can move based on the type of piece and other pieces in it's path.</p>
          <p className="lead">By clicking (or dragging) a piece, the spots which the piece can move are displayed. The piece can be moved by clicking on the spot to move to or dragging the piece on the spot.</p>
          <InstructionImage alt="example moves for a piece" className="mt-2" src={standardPieceMoves} />
        </Box>
        <Box className="mt-4">
          <h2>Types Of Pieces</h2>
          <p className="lead">Each player has eight standard pieces and one power piece. standard pieces may only move along horizontal and vertical axis (no diagonal moves). It also must travel as far it can move until it becomes obstructed by another piece or reaches the opponent's goal.</p>
          <InstructionImage alt="demonstration of piece movement rules for standard pieces" className="mt-2" src={turn}/>
          <p className="mt-2 lead">The power piece can be identified by the small inner circle in the piece. It can move along the horizontal and vertical axis, as well as diagonally. It also has the unique ability to be able to move any number of spots between it's boundary, whereas the standard piece must continue to travel until it meets it's boundary.</p>
          <InstructionImage alt="demonstration of piece movement rules for power pieces" className="mt-2" src={powerPieceMoves} />
        </Box>
        <Box className="mt-4">
          <h2>Goal Area</h2>
          <p className="lead">The objective is to move all nine pieces into the goal.</p>
          <InstructionImage alt="board with pieces in the goal area" src={objective} />
          <p className="mt-2 lead">Once a piece is moved into the goal, it is not able to move out of the goal area. However, a piece may be moved within the goal, with restrictions subject to the piece movement rules.</p>
          <InstructionImage alt="movement rules for pieces in the goal" src={moveInGoal} />
        </Box>
        <Box className="mt-4">
          <h2>Winning The Game</h2>
          <p className="lead">Be the first player to move all nine pieces into the goal</p>
          <InstructionImage alt="game over - black wins" src={gameOver}/>
        </Box>
      </Box>
      {onClose && <Button style={{ width: '35%', maxWidth: '300px', alignSelf: 'center' }} className='mt-4' onClick={onClose}>Close</Button>}
    </ContentWrapper>
  );
}
