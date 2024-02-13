import React from 'react';
import AuthenticationTemplate from '#/components/AuthenticationTemplate.js';
import Button from '#/components/Button.js';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { isLoading } from '#/redux/slice/uiSlice';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { resendLinkVerifyUserEmail } from '#/services/verifyEmail.services';
import { type RootState } from '#/redux/store';
import Loader from '#/components/Loader';
import {
  type ResendLinkVerifyEmailErrorResponse,
  type ResendLinkVerifyEmailSuccessResponse
} from './index.types';

export const ResendLinkVerifyEmail: React.FC = () => {
  const dispatch = useAppDispatch();
  const userAuthenticated = useAppSelector((state: RootState) => state.authentication);
  const { loadingState } = useAppSelector((state: RootState) => state.ui);

  const handleSubmit = async (): Promise<void> => {
    try {
      dispatch(isLoading(true));

      const response = await resendLinkVerifyUserEmail(userAuthenticated.id);

      if (response.status === 'error') {
        const responseError = response as ResendLinkVerifyEmailErrorResponse;
        // Errores de validación de campos por parte del backend

        // Mensaje de error general por parte del backend
        if (responseError.message !== '') {
          throw new Error(responseError.message);
        }
      } else {
        const responseSuccess = response as ResendLinkVerifyEmailSuccessResponse;
        toastNotifications().toastSuccesCustomize(responseSuccess.message);
      }

      // if ('data' in response) {
      //   toastNotifications().toastSuccesCustomize(
      //     'Se reenvio el link de verificación a su correo.'
      //   );
      // } else if ('error' in response) {
      //   const errorsDetail = response.error?.detail;
      //   if ('apiResponse' in errorsDetail) {
      //     throw new Error(errorsDetail.apiResponse);
      //   }
      // }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      {loadingState && <Loader />}
      <AuthenticationTemplate>
        <p className="text-5xl leading-10 font-bold text-center">
          ¡Debes verificar tu correo electrónico!
        </p>
        <p className="text-3xl leading-9 font-medium text-center">
          Se te ha enviado un link a tu email, al que deberás acceder para verificar tu email.
        </p>
        <p className="text-3xl leading-9 font-bold  text-center">
          Si aún no haz recibido el link de verificación, Solicita uno nuevo dando click al botón
        </p>

        <form onSubmit={handleSubmitWrapper} className="flex flex-col justify-center gap-4">
          <div className="flex">
            <Button text="Solicitar Link de verificación de email" type="submit" btnType="main" />
          </div>
        </form>
      </AuthenticationTemplate>
    </>
  );
};
