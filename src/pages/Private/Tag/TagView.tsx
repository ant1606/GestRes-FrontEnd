import Loader from '#/components/Loader';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { type RootState } from '#/redux/store';
import React, { useEffect } from 'react';

import Filter from './components/Filter';
import Table from './components/Table';
import Form from './components/Form';
import { useTag } from './context/tag.context';
import FooterTable from '#/components/FooterTable';
import { useSearchParams } from 'react-router-dom';
import { getTags } from '#/services/tag.services';
import perPageItemsValue from '#/config/perPageItemsValue';
import { changeTitle } from '#/redux/slice/uiSlice';
import { useFetch } from '#/hooks/useFetch';
import TableSkeleton from '#/components/Skeleton/TableSkeleton';

interface ReactPaginaOnPageChangeArgument {
  selected: number;
}

const TagView: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.loadingState);
  const dispatch = useAppDispatch();
  const {
    tags,
    tagMeta,
    setTags,
    setTagPerPage,
    tagPerPage,
    tagSearchLoading,
    setTagSearchLoading
  } = useTag();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchWithSessionHandling } = useFetch();

  useEffect(() => {
    setTagPerPage(perPageItemsValue[0].id);
    dispatch(changeTitle('Mantenimiento de Etiquetas'));
  }, []);

  const handlePageChange = async (e: ReactPaginaOnPageChangeArgument): Promise<void> => {
    setTagSearchLoading(true);
    searchParams.delete('page');
    searchParams.append('page', (e.selected + 1).toString());
    searchParams.delete('perPage');
    searchParams.append('perPage', tagPerPage);
    searchParams.sort();
    setSearchParams(searchParams);
    const tags = await getTags(searchParams.toString(), fetchWithSessionHandling);
    setTagSearchLoading(false);
    setTags(tags);
  };

  const handlePageChangeWrapper = (e: ReactPaginaOnPageChangeArgument): void => {
    handlePageChange(e);
  };

  return (
    <>
      {uiLoading && <Loader />}
      <Form />
      <Filter />
      {(tagSearchLoading as boolean) ? (
        <TableSkeleton />
      ) : tags.length === 0 ? (
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
