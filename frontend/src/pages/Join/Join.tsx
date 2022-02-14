import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { joinMatch } from 'api';
import { LoadingScreen, ContentWrapper } from 'components';

type ParamTypes = {
  matchAccessKey: string;
};

export function Join() {
  const { matchAccessKey } = useParams<ParamTypes>();
  const navigate = useNavigate();

  useEffect(() => {
    // Annoying that I need to cast it as string. It's an
    // issue with react-router
    joinMatch(matchAccessKey as string).then(() => {
      navigate(`/game/${matchAccessKey}`, { replace: true });
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
