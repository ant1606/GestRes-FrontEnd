import AuthenticationTemplate from '@/components/AuthenticationTemplate';
import React from 'react';
import { Form } from './components';
import { useAppSelector } from '@/hooks/redux';
import { type RootState } from '@/redux/store';
import Loader from '@/components/Loader';

export const PasswordResetView: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.value);
  return (
    <>
      {uiLoading && <Loader />}
      <AuthenticationTemplate>
        <p className="text-4xl leading-10 font-bold text-center">Ingrese su nueva contraseña</p>
        <Form />
      </AuthenticationTemplate>
    </>
  );
};
