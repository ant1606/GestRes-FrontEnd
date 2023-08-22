import React from 'react';

export const Message: React.FC = () => {
  return (
    <>
      <p className="text-5xl leading-10 font-bold text-center">Recuperación de contraseña</p>
      <p className="text-3xl leading-9 font-medium text-center">
        Hemos enviado un link a tu email, al que deberás acceder para poder actualizar tu
        contraseña.
      </p>
    </>
  );
};
