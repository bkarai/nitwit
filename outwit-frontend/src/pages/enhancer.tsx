import React from 'react';
import { Layout } from 'components';

export default function HomePageEnhancer(Component: React.ElementType) {
  return function(props: any) {
    return (
      <Layout>
        <Component {...props}/>
      </Layout>
    );
  }
}
