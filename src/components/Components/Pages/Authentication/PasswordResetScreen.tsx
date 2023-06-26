import React from 'react';
import Loader from '../../Atoms/Loader.js';
import AuthenticationTemplate from './AuthenticationTemplate.js';
import PasswordResetForm from '../../Organisms/Authentication/PasswordResetForm.js';
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
