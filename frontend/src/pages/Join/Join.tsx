import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { joinMatch } from 'api';
import { ContentWrapper, LoadingScreen } from 'components';
import { useGameAccessKey } from 'hooks';

export function Join() {
  const gameAccessKey = useGameAccessKey();
  const navigate = useNavigate();

  useEffect(() => {
    joinMatch(gameAccessKey as string).then(() => {
      navigate(`/game/${gameAccessKey}`, { replace: true });
    });
  }, [gameAccessKey, navigate]);

  return (
    <ContentWrapper>
      <LoadingScreen message="Joining the game..."/>
    </ContentWrapper>
  );
}
