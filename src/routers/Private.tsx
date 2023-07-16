import AppLayout from '@/components/AppLayout';
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import RoutesWithPageNotFound from './RoutesWithPageNotFound';
import Tag from '@/pages/Private/Tag';

export const Private: React.FC = () => {
  return (
    <AppLayout>
      <RoutesWithPageNotFound isPrivatePage={true}>
        <Route path="dashboard" element={<>Dashboard</>} />
        <Route path="tag" element={<Tag />} />
        <Route path="recourse" element={<>Recursos</>} />
        <Route path="/" element={<Navigate replace to="dashboard" />} />
      </RoutesWithPageNotFound>
    </AppLayout>
  );
};
