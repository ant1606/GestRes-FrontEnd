import AppLayout from '@/components/AppLayout';
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import RoutesWithPageNotFound from './RoutesWithPageNotFound';

export const Private: React.FC = () => {
  return (
    <AppLayout>
      <RoutesWithPageNotFound>
        <Route path="/" element={<Navigate replace to="dashboard" />} />
        <Route path="/dashboard" element={<>Dashboard</>} />
      </RoutesWithPageNotFound>
    </AppLayout>
  );
};
