import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { joinMatch } from 'api';
import { LoadingScreen, ContentWrapper } from 'components';
import { useGameAccessKey } from 'hooks';

export function Join() {
  const gameAccessKey = useGameAccessKey();
  const navigate = useNavigate();

  useEffect(() => {
    // Annoying that I need to cast it as string. It's an
    // issue with react-router
    joinMatch(gameAccessKey as string).then(() => {
      navigate(`/game/${gameAccessKey}`, { replace: true });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContentWrapper>
      <h1 className="display-2">
        Joining game...
      </h1>
      <LoadingScreen />
    </ContentWrapper>
  );
}
