import React from 'react';
import Box from '@mui/material/Box';

interface ContentWrapperProps {
  children: React.ReactNode;
};

export function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <Box textAlign='center' className="p-5 mt-4">
      {children}
    </Box>
  );
}
