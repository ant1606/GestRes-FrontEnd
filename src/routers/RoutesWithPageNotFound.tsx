import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from '@/pages/PageNotFound/PageNotFound';

interface Props {
  children: JSX.Element[] | JSX.Element;
}
const RoutesWithPageNotFound: React.FC<Props> = ({ children }) => {
  return (
    <Routes>
      {children}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default RoutesWithPageNotFound;
