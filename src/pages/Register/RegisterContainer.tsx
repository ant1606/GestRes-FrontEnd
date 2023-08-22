import React from 'react';
import RegisterView from './RegisterView';
import { RegisterProvider } from './context/register.context';

export const RegisterContainer: React.FC = () => {
  return (
    <RegisterProvider>
      <RegisterView />
    </RegisterProvider>
  );
};
