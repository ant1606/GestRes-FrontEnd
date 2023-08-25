import React from 'react';
import AuthenticationTemplate from '#/components/AuthenticationTemplate';
import Loader from '#/components/Loader';
import { useAppSelector } from '#/hooks/redux';
import { type RootState } from '#/redux/store';
import { Form, Message } from './components';
import { useRegister } from './context/register.context';

const RegisterView: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.loadingState);
  const { userWasRegister } = useRegister();
  return (
    <>
      {uiLoading && <Loader />}
      <AuthenticationTemplate>
        {userWasRegister === false ? <Form /> : <Message />}
      </AuthenticationTemplate>
    </>
  );
};

export default RegisterView;
