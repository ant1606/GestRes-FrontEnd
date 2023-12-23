import { useAppSelector } from '#/hooks/redux';
import { authenticatedUser } from '#/redux/slice/authenticationSlice';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
interface Props {
  userVerifiedEmail: boolean;
}

const UserVerifiedGuard: React.FC = () => {
  const userLoggin = useAppSelector(authenticatedUser);
  console.log('Pasamos por UserVerifiedGuard');
  return userLoggin.isVerified ? <Outlet /> : <Navigate replace to="/notifyVerifyEmail" />;
};

export default UserVerifiedGuard;
