import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { joinMatch } from 'api';
import { LoadingScreen, ContentWrapper } from 'components';
import { useGameAccessKey } from 'hooks';

export function Join() {
  const gameAccessKey = useGameAccessKey();
  const navigate = useNavigate();

  useEffect(() => {
    joinMatch(gameAccessKey as string).then(() => {
      navigate(`/game/${gameAccessKey}`, { replace: true });
    });
  }, [gameAccessKey]);

  return (
    <ContentWrapper>
      <h1 className="display-2">
        Joining game...
      </h1>
      <LoadingScreen />
    </ContentWrapper>
  );
}
