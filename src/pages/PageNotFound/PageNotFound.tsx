import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationTemplate from '@/components/AuthenticationTemplate';
import Button from '@/components/Button';

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate('/app/dashboard', { replace: true });
  };
  return (
    <AuthenticationTemplate>
      <p className="text-6xl font-bold">Página no Encontrada</p>
      <div className="flex justify-center items-center">
        <Button btnType="main" text="Regresar" type="button" handleClick={handleClick} />
      </div>
    </AuthenticationTemplate>
  );
};
