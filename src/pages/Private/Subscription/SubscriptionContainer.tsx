import React from 'react';
import SubscriptionView from './SubscriptionView';
import { SubscriptionYoutubeProvider } from './context/subscription.context';

export const SubscriptionContainer: React.FC = () => {
  return (
    <SubscriptionYoutubeProvider>
      <SubscriptionView />
    </SubscriptionYoutubeProvider>
  );
};
