import React from 'react';

import AuthenticationTemplate from '#/components/AuthenticationTemplate';
import Loader from '#/components/Loader';
import { Form, Message } from './components';
import { usePasswordForget } from './context/passwordForget.context';
import { useAppSelector } from '#/hooks/redux';
import { type RootState } from '#/redux/store';

const PasswordForgetView: React.FC = () => {
  const { resetUrlIsGenerated } = usePasswordForget();
  const uiLoading = useAppSelector((state: RootState) => state.ui.loadingState);
  return (
    <>
      {uiLoading && <Loader />}
      <AuthenticationTemplate>
        {resetUrlIsGenerated === false ? <Form /> : <Message />}
      </AuthenticationTemplate>
    </>
  );
};

export default PasswordForgetView;
