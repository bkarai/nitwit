import React from 'react';
import { Box } from 'components';
import { useIsMobile } from 'hooks';

interface ContentWrapperProps {
  children: React.ReactNode;
  boxProps?: Partial<React.ComponentProps<typeof Box>>;
  disablePadding?: boolean;
};

export function ContentWrapper({ disablePadding, children, boxProps = {} }: ContentWrapperProps) {
  const isMobile = useIsMobile();
  const paddingClass = isMobile ? 'p-2': 'p-5';

  return (
    <Box textAlign='center' className={disablePadding ? undefined : paddingClass} display="flex" flexDirection='column' justifyContent='center' {...boxProps}>
      {children}
    </Box>
  );
}
