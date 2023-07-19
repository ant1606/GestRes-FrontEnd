import Loader from '@/components/Loader';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { type RootState } from '@/redux/store';
import React, { useEffect } from 'react';

import Filter from './components/Filter';
import Table from './components/Table';
import Form from './components/Form';
import { useTag } from './context/tag.context';
import FooterTable from '@/components/FooterTable';
import { useSearchParams } from 'react-router-dom';
import { getTags } from '@/services/tag.services';
import perPageItemsValue from '@/config/perPageItemsValue';

interface ReactPaginaOnPageChangeArgument {
  selected: number;
}

const TagView: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.loadingState);
  const { tags, tagMeta, setTags, setTagPerPage, tagPerPage } = useTag();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTagPerPage(perPageItemsValue[0].id);
    // return () => {

    // };
  }, []);

  // const tags = [1, 2, 3];
  const handlePageChange = async (e: ReactPaginaOnPageChangeArgument): Promise<void> => {
    console.log('cambiando');
    searchParams.delete('page');
    searchParams.append('page', (e.selected + 1).toString());
    searchParams.delete('perPage');
    searchParams.append('perPage', tagPerPage);
    // searchParams.append('perPage', (5).toString());
    searchParams.sort();
    setSearchParams(searchParams);
    const tags = await getTags('');
    console.log(tags);
    dispatch(setTags(tags));
    // loadTags(searchParams.toString());
  };

  const handlePageChangeWrapper = (e: ReactPaginaOnPageChangeArgument): void => {
    handlePageChange(e);
  };

  return (
    <>
      {uiLoading && <Loader />}
      <Form />
      <Filter />
      {tags.length === 0 ? (
        <p>No se encontraron resultados</p>
      ) : (
        <>
          <Table />
          {tagMeta !== null && (
            <FooterTable handlePageChange={handlePageChangeWrapper} {...tagMeta} />
          )}
        </>
      )}
    </>
  );
};

export default TagView;
