import React, { useEffect } from 'react';
import TagView from './TagView';
import { useSearchParams } from 'react-router-dom';

export const TagContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // setIsLoading(true);
    // changeTitle('Etiquetas');
    // setTagPerPage(perPageItemsValue[0].id);
    // setIsLoading(false);
    // return () => {
    //   setTagPerPage(perPageItemsValue[0].id);
    // };
  }, []);

  // const handlePageChange = (e: any): void => {
  //   searchParams.delete('page');
  //   searchParams.append('page', e.selected + 1);
  //   searchParams.delete('perPage');
  //   searchParams.append('perPage', tagPerPage);
  //   searchParams.sort();
  //   setSearchParams(searchParams);
  //   // loadTags(searchParams.toString());
  // };

  return <TagView />;
};
