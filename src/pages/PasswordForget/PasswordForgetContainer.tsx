import React from 'react';

import PasswordForgetView from './PasswordForgetView';
import { PasswordForgetProvider } from './context/passwordForget.context';

export const PasswordForgetContainer: React.FC = () => {
  return (
    <>
      <PasswordForgetProvider>
        <PasswordForgetView />
      </PasswordForgetProvider>
    </>
  );
};
