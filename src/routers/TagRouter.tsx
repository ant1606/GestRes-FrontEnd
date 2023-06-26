import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TagProvider } from '../Context/TagContext.jsx';
import Tags from '../Components/Pages/Tag/TagScreenMain.jsx';

const TagRouter = () => {
  return (
    <TagProvider>
      <Routes>
        <Route path="/etiquetas" element={<Tags />} />
      </Routes>
    </TagProvider>
  );
};

export default TagRouter;
