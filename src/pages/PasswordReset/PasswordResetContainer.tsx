import React from 'react';
import { PasswordResetView } from './PasswordResetView';
import { PasswordResetProvider } from './context/passwordReset.context';

export const PasswordResetContainer: React.FC = () => {
  return (
    <PasswordResetProvider>
      <PasswordResetView />
    </PasswordResetProvider>
  );
};
