import Loader from '@/components/Loader';
import { useAppSelector } from '@/hooks/redux';
import { type RootState } from '@/redux/store';
import React from 'react';

import Filter from './components/Filter';
import Table from './components/Table';
import Form from './components/Form';
// import FooterTable from '@/components/FooterTable';

// interface Props {
//   handlePageChange: (evt: any) => void;
//   tags: any;
//   tagMeta: Record<string, string | null>;
// }

const TagView: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.loadingState);
  const tags = [1, 2, 3];
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
          {/* {tagMeta && <FooterTable handlePageChange={handlePageChange} {...tagMeta} />} */}
        </>
      )}
    </>
  );
};

export default TagView;
