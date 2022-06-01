import React from 'react';
import { Box } from 'components';
import { useIsMobile } from 'hooks';

interface ContentWrapperProps {
  children: React.ReactNode;
  boxProps?: Partial<React.ComponentProps<typeof Box>>;
};

export function ContentWrapper({ children, boxProps = {} }: ContentWrapperProps) {
  const isMobile = useIsMobile();
  const paddingClass = isMobile ? 'p-2': 'p-5'

  return (
    <Box textAlign='center' className={paddingClass} display="flex" flexDirection='column' justifyContent='center' {...boxProps}>
      {children}
    </Box>
  );
}
