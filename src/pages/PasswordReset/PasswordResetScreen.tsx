import React from 'react';
import Loader from '@/components/Loader';
import AuthenticationTemplate from '@/components/AuthenticationTemplate';
import PasswordResetForm from './components/PasswordResetForm';
// import useUser from '../../../Context/UserContext.jsx';

const PasswordResetScreen: React.FC = () => {
  const { userIsLoading } = useUser();

  return (
    <>
      {userIsLoading && <Loader />}
      <AuthenticationTemplate>
        <PasswordResetForm />
      </AuthenticationTemplate>
    </>
  );
};

export default PasswordResetScreen;
