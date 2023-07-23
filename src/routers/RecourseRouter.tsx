import React from 'react';
import { Route } from 'react-router-dom';
import Recourse from '@/pages/Private/Recourse';
import RoutesWithPageNotFound from './RoutesWithPageNotFound';
import { RecourseProvider } from '@/pages/Private/Recourse/context/recourse.context';
// import { RecourseProvider } from '../pages/Private/Recourse/context/RecourseContext.bak.js';
// import RecourseScreenForm from '../Components/Pages/Recourse/RecourseScreenForm.jsx';
// import RecourseScreenShow from '../Components/Pages/Recourse/RecourseScreenShow.jsx';
// import RecourseScreenMain from '../Components/Pages/Recourse/RecourseScreenMain.jsx';

const RecourseRouter: React.FC = () => {
  return (
    <RecourseProvider>
      <RoutesWithPageNotFound isPrivatePage={true}>
        <Route path="/" element={<Recourse />} />
        {/* <Route path="/new" element={<RecourseScreenForm />} /> */}
        {/* <Route path="/:idrecurso" element={<RecourseScreenShow />} /> */}
        {/* <Route path="/:idrecurso/edit" element={<RecourseScreenForm />} /> */}
      </RoutesWithPageNotFound>
    </RecourseProvider>
  );
};

export default RecourseRouter;
