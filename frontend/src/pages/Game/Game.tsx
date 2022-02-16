import styled from '@emotion/styled';
import { useEffect, useReducer, useContext } from 'react';
import { useParams } from 'react-router-dom';
import toastr from 'toastr';

import { GameContext } from 'context';
import { movePiece } from 'api';
import { updateGameMeta, finishTurn } from 'actions';
import { useGameReady, usePollForGameData } from 'hooks';
import { LoadingScreen, Timeline, GameBoard, ContentWrapper, WaitingForPlayer } from 'components';
import { getTimelinePosition } from './util';
import { initialState, rootReducer } from 'reducers';

export const LoadingWrapper = styled.div({
  marginTop: '20vh',
});

const WAIT_FOR_JOINER_POLL_SECONDS = 5;

type ParamTypes = {
  matchAccessKey: string,
};

function GameComponent() {

  const { state, dispatch } = useContext(GameContext);

  const pollForGameData = (state.isWhiteTurn && state.userType === 'black') || (!state.isWhiteTurn && state.userType === 'white') || !state.userType;
  const board = state.board;
  const userMadeMove = state.userMadeMove;
  const ready = state.ready;
  const winner = !!state.winner;
  const userType = state.userType;
  const isWhiteTurn = state.isWhiteTurn;

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


function MapStateToPropsMock() {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <GameComponent />
    </GameContext.Provider>
  );
}

export const Game = MapStateToPropsMock;
