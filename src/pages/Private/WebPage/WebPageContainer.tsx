import React from 'react';
import WebPageView from './WebPageView';
import { WebPageProvider } from './context/webPage.context';

export const WebPageContainer: React.FC = () => {
  return (
    <WebPageProvider>
      <WebPageView />
    </WebPageProvider>
  );
};
