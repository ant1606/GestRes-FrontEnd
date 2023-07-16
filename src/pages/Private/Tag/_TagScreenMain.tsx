import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import useTag from './context/TagContext.bak.js';
import TitleContext from '../../../Context/TitleContext.js';

import TagFilter from './components/Filter/_TagFilter.js';
import TagForm from '../../../components/Components/Organisms/Tag/TagForm.js';
import TagTable from '../../../components/Components/Organisms/Tag/TagTable.js';
import FooterTable from '../../../components/Components/Organisms/FooterTable.js';
import perPageItemsValue from '../../../helpers/perPageItemsValue.js';
import Loader from '../../Atoms/Loader.js';

const Etiquetas = () => {
  const { loadTags, tagMeta, tags, tagPerPage, tagIsLoading, setTagPerPage, setIsLoading } =
    useTag();
  const { changeTitle } = useContext(TitleContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    changeTitle('Etiquetas');
    setTagPerPage(perPageItemsValue[0].id);
    setIsLoading(false);
    return () => {
      setTagPerPage(perPageItemsValue[0].id);
    };
  }, []);

  // TODO Este metodo se repite en cada ScreenMain, ver si puedo acoplarlo en el mismo componenten de FooterTable
  const handlePageChange = (e) => {
    searchParams.delete('page');
    searchParams.append('page', e.selected + 1);
    searchParams.delete('perPage');
    searchParams.append('perPage', tagPerPage);
    searchParams.sort();
    setSearchParams(searchParams);
    loadTags(searchParams.toString());
  };

  return (
    <>
      {tagIsLoading && <Loader />}
      <TagForm />
      <TagFilter />
      {tags.length === 0 ? (
        <p>No se encontraron resultados</p>
      ) : (
        <>
          <TagTable />
          {tagMeta && <FooterTable handlePageChange={handlePageChange} {...tagMeta} />}
        </>
      )}
    </>
  );
};

export default Etiquetas;
