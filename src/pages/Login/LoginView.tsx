import React from 'react';
import { useAppSelector } from '#/hooks/redux';
import { type RootState } from '#/redux/store';
import Loader from '#/components/Loader';
import Form from './components/FormContainer';

const LoginView: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.loadingState);
  return (
    <>
      {uiLoading && <Loader />}
      <div className="relative bg-slate-50">
        <div className="login_background_top"></div>
        <div className="login_background_bottom"></div>

        <div className="absolute top-[6rem] left-auto right-auto ml-16 flex flex-col gap-4 min-w-[23rem] rounded-2xl">
          <Form />
        </div>
      </div>
    </>
  );
};

export default LoginView;
