import Login from '@/pages/Login';
import PasswordForget from '@/pages/PasswordForget';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace={true} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<PasswordForget />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
