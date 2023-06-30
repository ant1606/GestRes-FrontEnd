import React from 'react';
import { type RootState } from '@/redux/store';
import { useAppSelector } from '@/hooks/redux';
import Loader from '@/components/Components/Loader';

import { LoginProvider } from './context/login.context';
import LoginFormContainer from './LoginFormContainer';

export const LoginScreen: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.value);
  return (
    <LoginProvider>
      {uiLoading && <Loader />}
      <div className="relative bg-slate-50">
        <div className="login_background_top"></div>
        <div className="login_background_bottom"></div>

        <div className="absolute top-[6rem] left-auto right-auto ml-16 flex flex-col gap-4 min-w-[23rem] rounded-2xl">
          <LoginFormContainer />
        </div>
      </div>
    </LoginProvider>
  );
};
