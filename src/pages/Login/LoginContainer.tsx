import React from 'react';
import LoginView from './LoginView';
import { LoginProvider } from './context/login.context';

export const LoginContainer: React.FC = () => {
  return (
    <LoginProvider>
      <LoginView />
    </LoginProvider>
  );
};
