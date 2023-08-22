import { useAppSelector } from '@/hooks/redux';
import { authenticatedUser } from '@/redux/slice/authenticationSlice';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// interface Props {
//   userIsLogged: boolean;
// }

const PublicGuard: React.FC = () => {
  const userLoggin = useAppSelector(authenticatedUser);
  return !userLoggin.isLogged ? <Outlet /> : <Navigate replace to="app/" />;
};

export default PublicGuard;
