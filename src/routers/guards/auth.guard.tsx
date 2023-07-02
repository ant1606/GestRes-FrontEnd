import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  userIsLogged: boolean;
}

const AuthGuard: React.FC<Props> = ({ userIsLogged }) => {
  return userIsLogged ? <Outlet /> : <Navigate replace to="/login" />;
};

export default AuthGuard;
