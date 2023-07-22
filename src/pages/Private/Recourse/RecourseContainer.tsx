import React from 'react';
import RecourseView from './RecourseView';
import { RecourseProvider } from './context/recourse.context';

export const RecourseContainer: React.FC = () => {
  return (
    <RecourseProvider>
      <RecourseView />
    </RecourseProvider>
  );
};
