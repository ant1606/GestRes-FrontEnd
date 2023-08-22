import React from 'react';
import { Route } from 'react-router-dom';
import Recourse from '@/pages/Private/Recourse';
import RecourseNew from '@/pages/Private/Recourse/pages/Register';
import RecourseEdit from '@/pages/Private/Recourse/pages/Edit';
import RecourseShow from '@/pages/Private/Recourse/pages/Show';
import RoutesWithPageNotFound from './RoutesWithPageNotFound';
import { RecourseProvider } from '@/pages/Private/Recourse/context/recourse.context';

const RecourseRouter: React.FC = () => {
  return (
    <RecourseProvider>
      <RoutesWithPageNotFound isPrivatePage={true}>
        <Route path="new" element={<RecourseNew />} />
        <Route path=":idrecurso/" element={<RecourseShow />} />
        <Route path=":idrecurso/edit" element={<RecourseEdit />} />
        <Route path="/" element={<Recourse />} />
      </RoutesWithPageNotFound>
    </RecourseProvider>
  );
};

export default RecourseRouter;
