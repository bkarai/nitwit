import React from 'react';
import Box from '@mui/material/Box';

interface ContentWrapperProps {
  children: React.ReactNode;
  enableScroll?: boolean;
};

export function ContentWrapper({ children, enableScroll }: ContentWrapperProps) {
  return (
    <Box textAlign='center' className="p-5 mt-4" overflow={enableScroll ? 'scroll' : 'default'}>
      {children}
    </Box>
  );
}
