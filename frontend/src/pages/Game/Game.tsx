import styled from '@emotion/styled';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import toastr from 'toastr';

import { movePiece } from 'api';
import { State, Player } from 'store';
import { updateGameMeta, finishTurn } from 'actions';
import { useGameReady, usePollForGameData } from 'hooks';
import { LoadingScreen, Timeline, TimelinePosition, GameBoard, ContentWrapper, WaitingForPlayer } from 'components';

export const LoadingWrapper = styled.div({
  marginTop: '20vh',
});

function getTimelinePosition(hasWinner: boolean, ready: boolean): TimelinePosition {
  if (hasWinner) {
    return TimelinePosition.GAME_ENDED;
  } else if (ready) {
    return TimelinePosition.GAME_IN_PROGRESS;
  } else {
    return TimelinePosition.P1_JOINED;
  }
};

const WAIT_FOR_JOINER_POLL_SECONDS = 5;

type ParamTypes = {
  matchAccessKey: string,
};

function GameComponent({
  dispatch,
  pollForGameData,
  board,
  userMadeMove,
  ready,
  winner,
  userType,
  isWhiteTurn,
}: {
  dispatch: any,
  pollForGameData: boolean,
  board: string,
  userMadeMove: boolean,
  ready: boolean,
  winner: boolean,
  userType: Player | null,
  isWhiteTurn: boolean;
}) {

  const { matchAccessKey } = useParams<ParamTypes>() as ParamTypes;

  const [isLoading, isReady] = useGameReady(matchAccessKey, WAIT_FOR_JOINER_POLL_SECONDS * 1000);
  const gameData = usePollForGameData(matchAccessKey, pollForGameData, WAIT_FOR_JOINER_POLL_SECONDS * 1000);

  useEffect(() => {
    dispatch(updateGameMeta({
      ready: isReady,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    if ((isWhiteTurn && userType === 'white') || (!isWhiteTurn && userType === 'black')) {
        toastr.info('It is your turn!');
    }
  }, [isWhiteTurn]);

  useEffect(() => {
    dispatch(updateGameMeta(gameData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData]);

  useEffect(() => {
    if (userMadeMove) {
      movePiece(matchAccessKey, board).then(() => {
        dispatch(finishTurn());
        toastr.success('You made your move', undefined, { newestOnTop: false });
        toastr.info(`It is now ${userType === 'white' ? 'Black' : 'White'}'s' turn`, undefined, { newestOnTop: false });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMadeMove]);

  return (
    <>
      <Timeline position={isLoading ? undefined : getTimelinePosition(winner, ready)}/>
      {isLoading ?
        (<LoadingWrapper>
          <LoadingScreen />
        </LoadingWrapper>) :
        (
          <>
            {isReady ?
            (
              <ContentWrapper>
                <GameBoard />
              </ContentWrapper>
            ) : (
              <WaitingForPlayer matchAccessKey={matchAccessKey} />
            )
            }
          </>
        )
      }
  </>
  );
}

const mapStateToProps = (state: State) => ({
  pollForGameData: (state.isWhiteTurn && state.userType === 'black') || (!state.isWhiteTurn && state.userType === 'white') || !state.userType,
  board: state.board,
  userMadeMove: state.userMadeMove,
  ready: state.ready,
  winner: !!state.winner,
  userType: state.userType,
  isWhiteTurn: state.isWhiteTurn,
});

export const Game = connect(mapStateToProps)(GameComponent);
