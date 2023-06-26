import React, { useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiEmail, mdiLock, mdiLockCheck } from '@mdi/js';
import Field from '../../Atoms/Field.jsx';
import Button from '../../Atoms/Button.jsx';
import { useSecurity } from '../../../Context/SecurityContext.jsx';
import AuthenticationTemplate from './AuthenticationTemplate.jsx';

const ResendLinkVerifyEmailScreen = () => {
  const { securityUser, resendLinkVerifyUserEmail } = useSecurity();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await resendLinkVerifyUserEmail(securityUser.id);
  };

  return (
    <>
      <AuthenticationTemplate>
        <p className='text-5xl leading-10 font-bold text-center'>
          ¡Debes verificar tu correo electrónico!
        </p>
        <p className='text-3xl leading-9 font-medium text-center'>
          Se te ha enviado un link a tu email, al que deberás acceder para
          verificar tu email.
        </p>
        <p className='text-3xl leading-9 font-bold  text-center'>
          Si aún no haz recibido el link de verificación, Solicita uno nuevo
          dando click al botón
        </p>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center gap-4'
        >
          <div className='flex'>
            <Button
              text='Solicitar Link de verificación de email'
              type='submit'
              btnType='main'
            />
          </div>
        </form>
      </AuthenticationTemplate>
    </>
  );
};

export default ResendLinkVerifyEmailScreen;
