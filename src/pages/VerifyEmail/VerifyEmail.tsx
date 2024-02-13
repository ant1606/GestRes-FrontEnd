import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthenticationTemplate from '../../components/AuthenticationTemplate.js';
import { useAppDispatch } from '#/hooks/redux/index.js';
import { isLoading } from '#/redux/slice/uiSlice.js';
import { userIsLoggin } from '#/redux/slice/authenticationSlice.js';
import { verifyUserEmail } from '#/services/verifyEmail.services.js';
import { toastNotifications } from '#/utilities/notificationsSwal.js';
import { savePersistenDataUser } from '#/utilities/authenticationManagement.js';
import { type VerifyEmailErrorResponse, type VerifyEmailSuccessResponse } from './index.types.js';

export const VerifyEmail: React.FC = () => {
  const { id, hash } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    verifyEmail();
  });

  const userIsLoggedInPromise = async (params: User): Promise<void> => {
    await new Promise<void>((resolve) => {
      dispatch(
        userIsLoggin({
          email: params.email,
          id: parseInt(params.id),
          isVerified: params.isVerified,
          name: params.name
        })
      );
      resolve();
    });
  };

  const verifyEmail = async (): Promise<void> => {
    try {
      dispatch(isLoading(true));
      if (id?.trim() === '' || id === '0' || id === undefined)
        throw new Error('No se identifico al usuario');
      if (hash?.trim() === '' || hash === '' || hash === undefined)
        throw new Error('No se identifico al usuario');

      const response = await verifyUserEmail(id, hash);

      if (response.status === 'error') {
        const responseError = response as VerifyEmailErrorResponse;

        // Mensaje de error general por parte del backend
        if (responseError.message !== '') {
          throw new Error(responseError.message);
        }
      } else {
        const responseError = response as VerifyEmailSuccessResponse;
        savePersistenDataUser(responseError.data);
        await userIsLoggedInPromise(responseError.data.user);
        navigate('/app/dashboard', { replace: true });
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  return (
    <>
      <AuthenticationTemplate>
        <p className="text-5xl leading-10 font-bold text-center">
          Estamos verificando tu correo electrónico ...
        </p>
      </AuthenticationTemplate>
    </>
  );
};
