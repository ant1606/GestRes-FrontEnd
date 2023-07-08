import AppLayout from '@/components/AppLayout';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import RoutesWithPageNotFound from './RoutesWithPageNotFound';

export const Private: React.FC = () => {
  return (
    <AppLayout>
      <RoutesWithPageNotFound isPrivatePage={true}>
        <Route path="dashboard" element={<>Dashboard</>} />
        <Route path="recourse" element={<>Recursos</>} />
        <Route path="/" element={<Navigate replace to="dashboard" />} />
      </RoutesWithPageNotFound>
    </AppLayout>
  );
};
