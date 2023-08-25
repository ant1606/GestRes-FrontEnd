import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '#/components/Button';

export const Message: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate('/login', { replace: true });
  };
  return (
    <div className="flex flex-col justify-center align-center gap-14 min-w-[30rem] px-32">
      <p className="text-5xl leading-10 font-bold text-center">¡Gracias por registarte!</p>
      <p className="text-3xl leading-9 font-medium text-center">
        Hemos enviado un link a tu email, al que deberás acceder para verificar tu email.
      </p>
      <p className="text-3xl leading-9 font-bold  text-center">
        Si aún no haz recibido el link de verificación, ingresa a la aplicación y solicita un nuevo
        link de verificación
      </p>
      <div className="flex max-w-[12rem]">
        <Button text="Ir a Login" type="button" btnType="main" handleClick={handleClick} />
      </div>
    </div>
  );
};
