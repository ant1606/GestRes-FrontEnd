import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from '@/pages/PageNotFound/PageNotFound';

interface Props {
  children: JSX.Element[] | JSX.Element;
  isPrivatePage: boolean;
}
const RoutesWithPageNotFound: React.FC<Props> = ({ children, isPrivatePage = false }) => {
  return (
    <Routes>
      {children}

      <Route path="*" element={<PageNotFound isPrivatePage={isPrivatePage} />} />
    </Routes>
  );
};
export default RoutesWithPageNotFound;
