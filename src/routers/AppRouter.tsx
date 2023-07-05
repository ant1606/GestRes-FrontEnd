import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from '@/pages/Login';
import PasswordForget from '@/pages/PasswordForget';
import { PasswordReset } from '@/pages/PasswordReset';
import { Register } from '@/pages/Register';
import AuthGuard from './guards/auth.guard';
import ResendLinkVerifyEmailScreen from '@/pages/Private/VerifyEmail/ResendLinkVerifyEmailScreen';
import UserVerifiedGuard from './guards/userVerified.guard';
import { Private } from './Private';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { authenticatedUser, userIsLoggin } from '@/redux/slice/authenticationSlice';
import {
  rememberTokenExists,
  getRememberToken,
  tokenExpired
} from '@/utilities/authenticationManagement';
import { setCookie } from '@/utilities/manageCookies';
import { refreshUserFromRememberToken } from '@/services';

interface ResponseAPI {
  data?: Record<string, any>;
  error?: Record<string, any>;
}

const AppRouter: React.FC = () => {
  const userLoggin = useAppSelector(authenticatedUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    initApp();
  }, []);

  interface UserLoginParams {
    email: string;
    id: number;
    isVerified: boolean;
    name: string;
  }

  const userIsLoggedInPromise = async (params: UserLoginParams): Promise<void> => {
    await new Promise<void>((resolve) => {
      dispatch(
        userIsLoggin({
          email: params.email,
          id: params.id,
          isVerified: params.isVerified,
          name: params.name
        })
      );
      resolve();
    });
  };

  const initApp = async (): Promise<void> => {
    // TODO Cargar los datos de configuracion de la app
    // await loadSettings();

    if (tokenExpired()) {
      console.log('No Existe bearer token');
      if (rememberTokenExists()) {
        console.log('Existe remember Token');
        const response: ResponseAPI = await refreshUserFromRememberToken(getRememberToken);
        console.log({ response }, 'mockeamos el servicio refreshUserFromRememberToken');
        setCookie('bearerToken', response.data?.bearerToken, response.data?.bearerExpire);
        localStorage.setItem('rememberToken', response.data?.user.rememberToken);
        const userInfo = response.data?.user;
        // TODO Ver si es buena opcion Almacenar datos del usuario en store en redux
        localStorage.setItem('user', JSON.stringify(userInfo));

        dispatch(
          userIsLoggin({
            email: userInfo.email,
            id: userInfo.id,
            isVerified: userInfo.isVerified,
            name: userInfo.name
          })
        );
        navigate('/app/dashboard', { replace: true });
      } else {
        console.log('NO Existe remember Token');
        // TODO Limpiar si existen restos de los datos del usuario en el localStorage
        navigate('/login', { replace: true });
      }
    } else {
      const userJson = localStorage.getItem('user') ?? 'null';
      if (userJson !== 'null') {
        const userData = JSON.parse(userJson);

        await userIsLoggedInPromise(userData);
        navigate('app/dashboard', { replace: true });
      } else {
        // TODO Limpiar datos del rememberToken y bearerToken si es que no existen datos del usuario en localStorage
        navigate('/login', { replace: true });
      }
      // TODO Pasar como parametro la ultima pagina visitada del usuario, por el momento se esta colocando el dashboard
      // !user.is_verified ? navigate('/notifyVerifyEmail') : navigate('/dashboard');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace={true} />} />
      <Route path="login" element={<Login />} />
      <Route path="forget-password" element={<PasswordForget />} />
      <Route path="reset-password" element={<PasswordReset />}></Route>
      <Route path="register" element={<Register />}></Route>
      <Route element={<AuthGuard userIsLogged={userLoggin.isLogged} />}>
        <Route element={<UserVerifiedGuard userVerifiedEmail={userLoggin.isVerified} />}>
          <Route path="app/*" element={<Private />} />
        </Route>

        {!userLoggin.isVerified && (
          <Route path="notifyVerifyEmail" element={<ResendLinkVerifyEmailScreen />} />
        )}
      </Route>
      <Route path="*" element={<>No existe página</>} />
    </Routes>
  );
};

export default AppRouter;

/* <Route element={<AuthGuard userIsLogged={true} />}>
        <Route element={<UserVerifiedGuard userVerifiedEmail={true} />}>
          <Route path="app/*" element={<Private />} />
        </Route>

        {!true && <Route path="notifyVerifyEmail" element={<ResendLinkVerifyEmailScreen />} />}
      </Route> */
