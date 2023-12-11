import AppLayout from '#/components/AppLayout';
import React from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import RoutesWithPageNotFound from './RoutesWithPageNotFound';
import Tag from '#/pages/Private/Tag';
import Suscription from '#/pages/Private/Suscription';
import Dashboard from '#/pages/Private/Dashboard';
import RecourseRouter from './RecourseRouter';

export const Private: React.FC = () => {
  const location = useLocation();
  localStorage.setItem('lastPath', location.pathname);
  return (
    <AppLayout>
      <RoutesWithPageNotFound isPrivatePage={true}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tag" element={<Tag />} />
        <Route path="suscription" element={<Suscription />} />
        <Route path="recourse/*" element={<RecourseRouter />} />
        <Route path="/" element={<Navigate replace to="dashboard" />} />
      </RoutesWithPageNotFound>
    </AppLayout>
  );
};
