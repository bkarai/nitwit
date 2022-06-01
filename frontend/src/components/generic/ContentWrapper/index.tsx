import React from 'react';
import { Box } from 'components';

interface ContentWrapperProps {
  children: React.ReactNode;
  boxProps?: Partial<React.ComponentProps<typeof Box>>;
};

export function ContentWrapper({ children, boxProps = {} }: ContentWrapperProps) {
  return (
    <Box textAlign='center' className="p-5" display="flex" flexDirection='column' justifyContent='center' {...boxProps}>
      {children}
    </Box>
  );
}
