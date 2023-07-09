import { useAppSelector } from '@/hooks/redux';
import { authenticatedUser } from '@/redux/slice/authenticationSlice';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// interface Props {
//   userIsLogged: boolean;
// }

const AuthGuard: React.FC = () => {
  const userLoggin = useAppSelector(authenticatedUser);
  console.log(userLoggin);
  return userLoggin.isLogged ? <Outlet /> : <Navigate replace to="/login" />;
};

export default AuthGuard;
