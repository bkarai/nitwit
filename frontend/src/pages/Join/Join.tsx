import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { API_PREFIX } from 'consts';
import { LoadingScreen, ContentWrapper } from 'components';

type ParamTypes = {
  matchAccessKey: string;
};

export function Join() {
  const { matchAccessKey } = useParams<ParamTypes>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`${API_PREFIX}/match/${matchAccessKey}/join`, {},
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then((response) => {
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
