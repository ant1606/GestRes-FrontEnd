import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  userIsLogged: boolean;
}

const AuthGuard: React.FC<Props> = ({ userIsLogged }) => {
  console.log(userIsLogged, 'desde AuthGuard');
  return userIsLogged ? <Outlet /> : <Navigate replace to="/login" />;
};

export default AuthGuard;
