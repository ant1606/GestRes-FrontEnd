import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
interface Props {
  userVerifiedEmail: boolean;
}

const UserVerifiedGuard: React.FC<Props> = ({ userVerifiedEmail }) => {
  return userVerifiedEmail ? <Outlet /> : <Navigate replace to="/notifyVerifyEmail" />;
};

export default UserVerifiedGuard;
