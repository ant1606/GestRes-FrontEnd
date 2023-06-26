import React from 'react';
import Loader from '../../Atoms/Loader.jsx';
import AuthenticationTemplate from './AuthenticationTemplate.jsx';
import PasswordResetForm from '../../Organisms/Authentication/PasswordResetForm.jsx';
import useUser from '../../../Context/UserContext.jsx';

const PasswordResetScreen = () => {
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
