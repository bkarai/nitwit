import { useParams } from 'react-router-dom';

type ParamTypes = {
  gameAccessKey: string,
};

export function useGameAccessKey() {
  const { gameAccessKey } = useParams<ParamTypes>() as ParamTypes;
  return gameAccessKey;
};
