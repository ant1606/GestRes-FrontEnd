import React, { useState } from 'react';
import Loader from '../../Atoms/Loader.jsx';
import RegisterUserForm from '../../Organisms/Authentication/RegisterUserForm.jsx';
import useUser from '../../../Context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import RegisterUserMessage from '../../Organisms/Authentication/RegisterUserMessage.jsx';
import AuthenticationTemplate from './AuthenticationTemplate.jsx';

const RegisterUserScreen = () => {
  const { userIsLoading } = useUser();
  const [userRegistered, setUserRegistered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };
  return (
    <>
      {userIsLoading && <Loader />}
      <AuthenticationTemplate>
        {userRegistered ? (
          <RegisterUserMessage handleClickToLogin={handleClick} />
        ) : (
          <RegisterUserForm handleUserRegistered={setUserRegistered} />
        )}
      </AuthenticationTemplate>
    </>
  );
};

export default RegisterUserScreen;
