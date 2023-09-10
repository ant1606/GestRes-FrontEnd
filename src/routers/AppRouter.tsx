import React, { useEffect } from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { authenticatedUser, userIsLoggin } from '#/redux/slice/authenticationSlice';
import { checkAuthentication } from '#/utilities/authenticationManagement';
import AuthGuard from './guards/auth.guard';
import PublicGuard from './guards/public.guard';
import UserVerifiedGuard from './guards/userVerified.guard';
import RoutesWithPageNotFound from './RoutesWithPageNotFound';
import { Private } from './Private';
import Login from '#/pages/Login';
import PasswordForget from '#/pages/PasswordForget';
import PasswordReset from '#/pages/PasswordReset';
import Register from '#/pages/Register';
import VerifyEmail from '#/pages/VerifyEmail';
import ResendLinkVerifyEmail from '#/pages/Private/ResendVerifyLinkEmail';
import { getSettings } from '#/services/settings.services';
import { loadSettings } from '#/redux/slice/settingsSlice';
import Cookies from 'js-cookie';

// interface ResponseAPI {
//   data?: Record<string, any>;
//   error?: Record<string, any>;
// }
interface UserLoginParams {
  email: string;
  id: number;
  isVerified: boolean;
  name: string;
}

const AppRouter: React.FC = () => {
  const userLoggin = useAppSelector(authenticatedUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('beforeunload', behaviorClosingApp);
    // window.addEventListener('unload', handleTabClosing);
    initApp();
    return () => {
      window.removeEventListener('beforeunload', behaviorClosingApp);
      // window.removeEventListener('unload', handleTabClosing);
    };
  }, []);

  const behaviorClosingApp = (): void => {
    // TODO Añadir restricción que no se elimine si es que existe el rememberToken
    Cookies.remove('bearerToken');
  };

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
  const settingsLoadedInPromise = async (params): Promise<void> => {
    // TODO Ver si puedo refactorizar más esta parte del settings y su service
    await new Promise<void>((resolve) => {
      dispatch(
        loadSettings({
          settingsType: params.filter((val) => val.type === import.meta.env.VITE_SETTINGS_TYPE),
          settingsStatus: params.filter((val) => val.type === import.meta.env.VITE_SETTINGS_STATUS)
        })
      );
      resolve();
    });
  };

  const initApp = async (): Promise<void> => {
    try {
      const settings = await getSettings();
      await settingsLoadedInPromise(settings.data);
      // TODO Cargar la última página visitada por el usuario
      const user = await checkAuthentication();
      // TODO ANalizar adecuadamente esta parte, ya que sólo deberia llamarse cuando exista el usuario en el remember
      await userIsLoggedInPromise(user);
      const lastPath = localStorage.getItem('lastPath') as string;
      if (
        lastPath !== null ||
        lastPath !== 'null' ||
        lastPath !== '' ||
        lastPath !== 'undefined' ||
        lastPath !== undefined
      ) {
        navigate(lastPath);
      }
    } catch (error) {
      console.log(error);
      // TODO Investigar como poder hacer el registro de logs de los errores generados
      // TODO Ver el siguiente error
      /**
       * Error: Error en la autenticación
       * at checkAuthentication (authenticationManagement.ts:80:11)
       * at initApp (AppRouter.tsx:84:26)
       */
    }
  };

  return (
    <RoutesWithPageNotFound>
      <Route path="forget-password" element={<PasswordForget />} />
      <Route path="reset-password" element={<PasswordReset />} />
      <Route path="register" element={<Register />} />
      <Route path="/verifyEmail/:id/:hash" element={<VerifyEmail />} />
      <Route element={<PublicGuard />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<AuthGuard />}>
        <Route element={<UserVerifiedGuard />}>
          <Route path="app/*" element={<Private />} />
        </Route>

        {!userLoggin.isVerified && (
          <Route path="notifyVerifyEmail" element={<ResendLinkVerifyEmail />} />
        )}
      </Route>
      <Route path="/" element={<Navigate to="/login" replace={true} />} />
    </RoutesWithPageNotFound>
  );
};

export default AppRouter;
