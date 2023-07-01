import Login from '@/pages/Login';
import PasswordForget from '@/pages/PasswordForget';
import { PasswordReset } from '@/pages/PasswordReset';
import { Register } from '@/pages/Register';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<PasswordForget />} />
        <Route path="/reset-password" element={<PasswordReset />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Navigate to="/login" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
