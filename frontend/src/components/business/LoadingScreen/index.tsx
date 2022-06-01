import { Loading, Box } from 'components';

interface LoadingScreenProps {
  message: string;
}

export function LoadingScreen({
  message,
}: LoadingScreenProps) {
  return (
    <>
      <h1 className="display-2">
        {message}
      </h1>
      <Box mt={1} height="20vh" maxHeight="200px">
        <Loading />
      </Box>
    </>
  );
}
