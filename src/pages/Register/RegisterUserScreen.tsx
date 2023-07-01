import React, { useState } from 'react';
import Loader from '../../Atoms/Loader.js';
import RegisterUserForm from '../../Organisms/Authentication/RegisterUserForm.js';
import useUser from '../../../Context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import RegisterUserMessage from '../../Organisms/Authentication/RegisterUserMessage.js';
import AuthenticationTemplate from '../../components/AuthenticationTemplate.js';
import Message from './components/Message.js';

const RegisterUserScreen: React.FC = () => {
  const { userIsLoading } = useUser();
  const [userRegistered, setUserRegistered] = useState(false);

  return (
    <>
      {userIsLoading && <Loader />}
      <AuthenticationTemplate>
        {userRegistered ? (
          <Message />
        ) : (
          <RegisterUserForm handleUserRegistered={setUserRegistered} />
        )}
      </AuthenticationTemplate>
    </>
  );
};

export default RegisterUserScreen;
