import AppLayout from '@/components/AppLayout';
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import RoutesWithPageNotFound from './RoutesWithPageNotFound';

export const Private: React.FC = () => {
  console.log('desde private');
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
