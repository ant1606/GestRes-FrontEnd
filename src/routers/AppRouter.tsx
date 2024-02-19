import React, { useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { authenticatedUser } from '#/redux/slice/authenticationSlice';
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
import OAuthCallback from '#/pages/OAuthCallback';
import { useFetch } from '#/hooks/useFetch';

const AppRouter: React.FC = () => {
  const userLoggin = useAppSelector(authenticatedUser);
  const dispatch = useAppDispatch();
  const { fetchWithoutAuthorizationRequiredHandling } = useFetch();

  useEffect(() => {
    initApp();
  }, []);

  const settingsLoadedInPromise = async (params: Settings[]): Promise<void> => {
    await new Promise<void>((resolve) => {
      dispatch(
        loadSettings({
          settingsType: params.filter((val) => val.type === import.meta.env.VITE_SETTINGS_TYPE),
          settingsStatus: params.filter((val) => val.type === import.meta.env.VITE_SETTINGS_STATUS),
          settingsUnitMeasureProgress: params.filter(
            (val) => val.type === import.meta.env.VITE_SETTINGS_UNIT_MEASURE_PROGRESS
          )
        })
      );
      resolve();
    });
  };

  const initApp = async (): Promise<void> => {
    try {
      // TODO Hacer validación de error y tipado de respuesta
      const settings = (await getSettings(fetchWithoutAuthorizationRequiredHandling)) as any;
      await settingsLoadedInPromise(settings.data);
    } catch (error) {
      console.log(error);
      // TODO Mostra mensaje de error al cargar Settings en aplicación
    }
  };

  return (
    <RoutesWithPageNotFound>
      <Route path="forget-password" element={<PasswordForget />} />
      <Route path="reset-password" element={<PasswordReset />} />
      <Route path="register" element={<Register />} />
      <Route path="verifyEmail/:id/:hash" element={<VerifyEmail />} />
      <Route path="oauthcallback" element={<OAuthCallback />} />
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
