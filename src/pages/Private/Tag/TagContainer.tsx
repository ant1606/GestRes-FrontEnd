import React from 'react';
import TagView from './TagView';
import { TagProvider } from './context/tag.context';
export const TagContainer: React.FC = () => {
  return (
    <TagProvider>
      <TagView />
    </TagProvider>
  );
};
