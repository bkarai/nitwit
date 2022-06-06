import React from 'react';
import { Box } from 'components';

interface ContentWrapperProps {
  children: React.ReactNode;
  boxProps?: Partial<React.ComponentProps<typeof Box>>;
  disablePadding?: boolean;
};

export function ContentWrapper({ disablePadding, children, boxProps = {} }: ContentWrapperProps) {
  return (
    <Box textAlign='center' className={disablePadding ? undefined : 'p-2'} display="flex" flexDirection='column' justifyContent='center' {...boxProps}>
      {children}
    </Box>
  );
}
