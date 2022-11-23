import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

import useTag from '../../../Context/TagContext';
import TitleContext from '../../../Context/TitleContext';

import TagFilter from '../../Organisms/Tag/TagFilter.jsx';
import TagForm from '../../Organisms/Tag/TagForm.jsx';
import Table from '../../Organisms/Tag/Table';
import FooterTable from '../../Organisms/FooterTable';
import perPageItemsValue from "../../../helpers/perPageItemsValue.js";
import Loader from "../../Atoms/Loader.jsx";

const Etiquetas = () => {
  const {
    loadTags,
    tagMeta,
    tags,
    tagPerPage,
    tagIsLoading,
    setTagPerPage,
    setIsLoading,
  } = useTag();
  const { changeTitle } = useContext(TitleContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    changeTitle("Etiquetas");
    setTagPerPage(perPageItemsValue[0].id);
    setIsLoading(false);
    return () => {
      setTagPerPage(perPageItemsValue[0].id);
    }
  }, []);

  const handlePageChange = (e) => {
    searchParams.delete('page');
    searchParams.append('page', e.selected + 1);
    searchParams.delete('perPage');
    searchParams.append('perPage', tagPerPage);
    searchParams.sort()
    setSearchParams(searchParams);
    loadTags(searchParams.toString())
  }

  return (
    <>
      {tagIsLoading && <Loader/>}
      <TagForm />
      <TagFilter />
      {
        tags.length === 0 ?
          (
            <p>No se encontraron resultados</p>
          )
          :
          (
            <>
              <Table />
              {
                tagMeta &&
                (
                  <FooterTable
                    handlePageChange={handlePageChange}
                    {...tagMeta}
                  />
                )
              }
            </>
          )
      }
    </>
  )
}

export default Etiquetas