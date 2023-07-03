import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import PasswordForget from '@/pages/PasswordForget';
import { PasswordReset } from '@/pages/PasswordReset';
import { Register } from '@/pages/Register';
import AuthGuard from './guards/auth.guard';
import ResendLinkVerifyEmailScreen from '@/pages/Private/VerifyEmail/ResendLinkVerifyEmailScreen';
import UserVerifiedGuard from './guards/userVerified.guard';
import { Private } from './Private';
import { useAppSelector } from '@/hooks/redux';
import { authenticatedUser } from '@/redux/slice/authenticationSlice';

const AppRouter: React.FC = () => {
  const userLoggin = useAppSelector(authenticatedUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace={true} />} />
        <Route path="login" element={<Login />} />
        <Route path="forget-password" element={<PasswordForget />} />
        <Route path="reset-password" element={<PasswordReset />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route element={<AuthGuard userIsLogged={userLoggin.isLogged} />}>
          <Route element={<UserVerifiedGuard userVerifiedEmail={userLoggin.isVerified} />}>
            <Route path="app/*" element={<Private />} />
          </Route>

          {!userLoggin.isVerified && (
            <Route path="notifyVerifyEmail" element={<ResendLinkVerifyEmailScreen />} />
          )}
        </Route>
        <Route path="*" element={<>No existe página</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
