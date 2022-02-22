import styled from '@emotion/styled';
import { useEffect, useReducer, useContext } from 'react';

import { GameContext } from 'context';
import { movePiece } from 'api';
import { updateGameMeta, finishTurn } from 'actions';
import { useGameReady, usePollForGameData, useMatchAccessKey } from 'hooks';
import { LoadingScreen, Timeline, GameBoard, ContentWrapper, WaitingForPlayer } from 'components';
import { getTimelinePosition, sendNotification, NotificationType } from './util';
import { initialState, rootReducer } from 'reducers';
import { PieceColor } from 'model';

export const LoadingWrapper = styled.div({
  marginTop: '20vh',
});

const WAIT_FOR_JOINER_POLL_SECONDS = 5;

function GameComponent() {
  const { state, dispatch } = useContext(GameContext);

  const pollForGameData = (state.isWhiteTurn && state.userType === PieceColor.BLACK) || (!state.isWhiteTurn && state.userType === PieceColor.WHITE) || !state.userType;
  const winner = !!state.winner;
  const { board, userMadeMove, ready, userType, isWhiteTurn } = state;

  const matchAccessKey = useMatchAccessKey();

  const [isLoading, isReady] = useGameReady(matchAccessKey, WAIT_FOR_JOINER_POLL_SECONDS);
  const gameData = usePollForGameData(matchAccessKey, pollForGameData, WAIT_FOR_JOINER_POLL_SECONDS);

  useEffect(() => {
    dispatch(updateGameMeta({
      ready: isReady,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    if ((isWhiteTurn && userType === PieceColor.WHITE) || (!isWhiteTurn && userType === PieceColor.BLACK)) {
      sendNotification('It is your turn!', NotificationType.INFO);
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
        sendNotification('You made your move', NotificationType.SUCCESS);
        sendNotification(`It is now ${userType === PieceColor.WHITE ? 'Black' : 'White'}'s' turn`, NotificationType.INFO);
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

function MapStateToPropsMock() {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <GameComponent />
    </GameContext.Provider>
  );
}

export const Game = MapStateToPropsMock;
