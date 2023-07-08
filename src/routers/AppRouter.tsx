import React, { useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import PasswordForget from '@/pages/PasswordForget';
import { PasswordReset } from '@/pages/PasswordReset';
import { Register } from '@/pages/Register';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { authenticatedUser, userIsLoggin } from '@/redux/slice/authenticationSlice';
import { checkAuthentication } from '@/utilities/authenticationManagement';
import VerifyEmail from '@/pages/VerifyEmail';
import { ResendLinkVerifyEmail } from '@/pages/Private/ResendVerifyLinkEmail/ResendLinkVerifyEmail';
import AuthGuard from './guards/auth.guard';
import PublicGuard from './guards/public.guard';
import UserVerifiedGuard from './guards/userVerified.guard';
import RoutesWithPageNotFound from './RoutesWithPageNotFound';
import { Private } from './Private';

// interface ResponseAPI {
//   data?: Record<string, any>;
//   error?: Record<string, any>;
// }
const AppRouter: React.FC = () => {
  const userLoggin = useAppSelector(authenticatedUser);
  const dispatch = useAppDispatch();

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
    try {
      // TODO Cargar los datos de configuracion de la app
      // await loadSettings();
      const user = await checkAuthentication();
      await userIsLoggedInPromise(user);
    } catch (error) {
      // TODO Investigar como poder hacer el registro de logs de los errores generados
      // console.log(error);
    }
  };

  return (
    <RoutesWithPageNotFound>
      <Route element={<PublicGuard />}>
        <Route path="login" element={<Login />} />
        <Route path="forget-password" element={<PasswordForget />} />
        <Route path="reset-password" element={<PasswordReset />} />
        <Route path="register" element={<Register />} />
        <Route path="/verifyEmail/:id/:hash" element={<VerifyEmail />} />
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

// const initApp = async (): Promise<void> => {
//   try {
//     // TODO Cargar los datos de configuracion de la app
//     // await loadSettings();
//     if (tokenExpired()) {
//       if (rememberTokenExists()) {
//         const response: ResponseAPI = await refreshUserFromRememberToken(getRememberToken);

//         if ('data' in response) {
//           Cookies.set('bearerToken', response.data?.bearerToken, { expires: 1 });
//           // setCookie('bearerToken', response.data?.bearerToken, response.data?.bearerExpire);
//           localStorage.setItem('rememberToken', response.data?.user.rememberToken);
//           const userInfo = response.data?.user;
//           // TODO Ver si es buena opcion Almacenar datos del usuario en store en redux
//           localStorage.setItem('user', JSON.stringify(userInfo));

//           await userIsLoggedInPromise(userInfo);

//           // navigate('app/dashboard', { replace: true });
//         } else if ('error' in response) {
//           throw new Error('El token no es válido');
//         }
//       } else {
//         // TODO Limpiar si existen restos de los datos del usuario en el localStorage
//         throw new Error('No existen tokens');
//       }
//     } else {
//       const userJson = localStorage.getItem('user') ?? 'null';
//       if (userJson !== 'null') {
//         const userData = JSON.parse(userJson);
//         await userIsLoggedInPromise(userData);
//         // TODO esto esta fallando, ya que si me dirijo a /recourse, me redirige a app
//         navigate('app/dashboard', { replace: true });
//       } else {
//         // TODO Limpiar datos del rememberToken y bearerToken si es que no existen datos del usuario en localStorage
//         throw new Error(
//           'Los datos del usuario no son válidos, limpiar cache y datos del navegador'
//         );
//       }
//       // TODO Pasar como parametro la ultima pagina visitada del usuario, por el momento se esta colocando el dashboard
//       // !user.is_verified ? navigate('/notifyVerifyEmail') : navigate('/dashboard');
//     }
//   } catch (error) {
//     // TODO Investigar como poder hacer el registro de logs de los errores generados
//     // console.log(error);
//   }
// };
