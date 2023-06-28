import React from 'react';
import LoginForm from './LoginForm';
import { LoginProvider } from './context/login.context';
import { useSelector } from 'react-redux';
import { type RootState } from '@/redux/store';
import Loader from '@/components/Components/Loader';

const LoginScreen: React.FC = () => {
  const uiLoading = useSelector((state: RootState) => state.ui.value);
  console.log(uiLoading);
  return (
    <LoginProvider>
      {uiLoading && <Loader />}
      <div className="relative bg-slate-50">
        <div className="login_background_top"></div>
        <div className="login_background_bottom"></div>

        <div className="absolute top-[6rem] left-auto right-auto ml-16 flex flex-col gap-4 min-w-[23rem] rounded-2xl">
          <p>Hola {uiLoading.toString()}</p>
          <LoginForm />
        </div>
      </div>
    </LoginProvider>
  );
};
export default LoginScreen;
