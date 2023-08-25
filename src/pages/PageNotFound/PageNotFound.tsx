import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationTemplate from '#/components/AuthenticationTemplate';
import Button from '#/components/Button';

interface Props {
  isPrivatePage: boolean;
}
export const PageNotFound: React.FC<Props> = ({ isPrivatePage }) => {
  if (isPrivatePage) {
    return <ContentPageNotFound />;
  }
  return (
    <AuthenticationTemplate>
      <ContentPageNotFound />
    </AuthenticationTemplate>
  );
};

const ContentPageNotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate('/app/dashboard', { replace: true });
  };
  return (
    <>
      <p className="text-6xl font-bold">Página no Encontrada</p>
      <div className="flex justify-center items-center">
        <Button btnType="main" text="Regresar" type="button" handleClick={handleClick} />
      </div>
    </>
  );
};
