import Box from '@mui/material/Box';

interface CenterAlignChildProps {
  children?: React.ReactNode;
}

export function CenterAlignChild({ children }: CenterAlignChildProps) {
  return (
    <Box display='flex' alignItems='center' justifyContent='space-around' width='100%' height='100%'>
      {children}
    </Box>
  );
}
