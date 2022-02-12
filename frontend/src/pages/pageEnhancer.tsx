import React from 'react';
import { Layout } from 'components';

export function pageEnhancer(Component: React.ElementType) {
  return function(props: any) {
    return (
      <Layout>
        <Component {...props}/>
      </Layout>
    );
  }
}
