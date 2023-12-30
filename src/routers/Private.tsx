import AppLayout from '#/components/AppLayout';
import React from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import RoutesWithPageNotFound from './RoutesWithPageNotFound';
import Tag from '#/pages/Private/Tag';
import Subscription from '#/pages/Private/Subscription';
import Dashboard from '#/pages/Private/Dashboard';
import RecourseRouter from './RecourseRouter';
import WebPage from '#/pages/Private/WebPage';

export const Private: React.FC = () => {
  const location = useLocation();
  localStorage.setItem('lastPath', location.pathname);
  return (
    <AppLayout>
      <RoutesWithPageNotFound isPrivatePage={true}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tag" element={<Tag />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="webpage" element={<WebPage />} />
        <Route path="recourse/*" element={<RecourseRouter />} />
        <Route path="/" element={<Navigate replace to="dashboard" />} />
      </RoutesWithPageNotFound>
    </AppLayout>
  );
};
