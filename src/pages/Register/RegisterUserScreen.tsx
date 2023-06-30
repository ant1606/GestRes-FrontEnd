import React, { useState } from 'react';
import Loader from '../../Atoms/Loader.js';
import RegisterUserForm from '../../Organisms/Authentication/RegisterUserForm.js';
import useUser from '../../../Context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import RegisterUserMessage from '../../Organisms/Authentication/RegisterUserMessage.js';
import AuthenticationTemplate from '../../components/AuthenticationTemplate.js';

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
