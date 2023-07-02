import Login from '@/pages/Login';
import PasswordForget from '@/pages/PasswordForget';
import { PasswordReset } from '@/pages/PasswordReset';
import { Register } from '@/pages/Register';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from './guards/auth.guard';
import ResendLinkVerifyEmailScreen from '@/pages/Private/VerifyEmail/ResendLinkVerifyEmailScreen';
import UserVerifiedGuard from './guards/userVerified.guard';

const AppRouter: React.FC = () => {
  const userIsLogged = true;
  const userVerifiedEmail = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace={true} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<PasswordForget />} />
        <Route path="/reset-password" element={<PasswordReset />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<AuthGuard userIsLogged={userIsLogged} />}>
          <Route element={<UserVerifiedGuard userVerifiedEmail={userVerifiedEmail} />}>
            <Route path="/dashboard" element={<>Dashboard</>} />
          </Route>

          {!userVerifiedEmail && (
            <Route path="/notifyVerifyEmail" element={<ResendLinkVerifyEmailScreen />} />
          )}
        </Route>
        <Route path="/*" element={<Navigate replace to="/dashboard" />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
