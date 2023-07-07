import React from 'react';
import AuthenticationTemplate from '@/components/AuthenticationTemplate.js';
import Button from '@/components/Button.js';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { isLoading } from '@/redux/slice/uiSlice';
import { toastNotifications } from '@/utilities/notificationsSwal';
import { resendLinkVerifyUserEmail } from '@/services/verifyEmail.services';
import { type RootState } from '@/redux/store';
import Loader from '@/components/Loader';

interface ResponseAPI {
  data?: Record<string, any>;
  error?: Record<string, any>;
}

export const ResendLinkVerifyEmail: React.FC = () => {
  const dispatch = useAppDispatch();
  const userAuthenticated = useAppSelector((state: RootState) => state.authentication);
  const { value: uiLoading } = useAppSelector((state: RootState) => state.ui);

  const handleSubmit = async (): Promise<void> => {
    try {
      dispatch(isLoading(true));

      const response: ResponseAPI = await resendLinkVerifyUserEmail(userAuthenticated.id);
      if ('data' in response) {
        toastNotifications().toastSuccesCustomize(
          'Se reenvio el link de verificación a su correo.'
        );
      } else if ('error' in response) {
        const errorsDetail = response.error?.detail;
        if ('apiResponse' in errorsDetail) {
          throw new Error(errorsDetail.apiResponse);
        }
      }
    } catch (error) {
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit();
  };
  // console.log(uiLoading);

  return (
    <>
      {uiLoading && <Loader />}
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
