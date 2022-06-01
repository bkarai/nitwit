import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';
import './styles.css';

const LOADING_SCREEN_TYPE: LoadingType = 'bubbles';
const LOADING_SCREEN_COLOR = '#000000';

export const Loading = React.memo(function() {
  return (
    <ReactLoading className="loading-screen" type={LOADING_SCREEN_TYPE} color={LOADING_SCREEN_COLOR} height={'100%'} width={'25%'} />
  );
});
