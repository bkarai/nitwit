import { useParams } from 'react-router-dom';

type ParamTypes = {
  matchAccessKey: string,
};

export function useMatchAccessKey() {
  const { matchAccessKey } = useParams<ParamTypes>() as ParamTypes;
  return matchAccessKey;
};
