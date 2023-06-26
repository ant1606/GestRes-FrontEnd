import React, { useState } from 'react';
import Button from '../../Atoms/Button.js';
import Icon from '@mdi/react';
import { mdiEmail } from '@mdi/js';
import Field from '../../Atoms/Field.js';
import useUser from '../../../Context/UserContext.jsx';
import { validateUserEmail } from '../../Organisms/Authentication/RegisterFormValidationInputs.js';
import { useForm } from '../../../hooks/useForm.js';
import Loader from '../../Atoms/Loader.js';
import AuthenticationTemplate from './AuthenticationTemplate.js';
import PasswordForgetForm from '../../Organisms/Authentication/PasswordForgetForm.js';
import PasswordForgetMessage from '../../Organisms/Authentication/PasswordForgetMessage.js';

const PasswordForgetScreen = () => {
  const { userIsLoading } = useUser();
  const [validateEmail, setValidateEmail] = useState(false);

  return (
    <>
      {userIsLoading && <Loader />}
      <AuthenticationTemplate>
        {!validateEmail ? (
          <PasswordForgetForm handleSendValidateEmail={setValidateEmail} />
        ) : (
          <PasswordForgetMessage />
        )}
      </AuthenticationTemplate>
    </>
  );
};

export default PasswordForgetScreen;
