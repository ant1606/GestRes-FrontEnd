import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const Private: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="dashboard" />} />
      <Route path="dashboard" element={<>Dashboard</>} />
      <Route path="*" element={<>No existe pagina</>} />
    </Routes>
  );
};
