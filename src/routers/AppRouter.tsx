import Login from '@/pages/Login';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace={true} />} />
        <Route path="/login/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
