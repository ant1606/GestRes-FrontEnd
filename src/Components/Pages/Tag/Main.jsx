import React, { useContext, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

import useTag from '../../../Context/TagContext';
import TitleContext from '../../../Context/TitleContext';

import Modal from '../../Molecules/Modal';
import Filter from '../../Organisms/Tag/Filter';
import Form from '../../Organisms/Tag/Form';
import Table from '../../Organisms/Tag/Table';
import FooterTable from '../../Organisms/FooterTable';


const Etiquetas = () => {

  const { loadTags, tagDelete, deletedTag, destroyTag, tagMeta, tags } = useTag();
  const { changeTitle } = useContext(TitleContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    changeTitle("Etiquetas");

    loadTags(searchParams.toString());
  }, []);

  const handleClickDeleteModal = () => {
    deletedTag(null);
  }
  const handleClickAcceptModal = () => {
    destroyTag();
    deletedTag(null);
  }

  const handlePageChange = (e) => {
    searchParams.delete('page');
    searchParams.append('page', e.selected + 1);
    searchParams.sort()
    setSearchParams(searchParams);
    loadTags(searchParams.toString())
  }

  return (
    <>

      {
        tagDelete && (
          <Modal
            title="Eliminar Etiqueta"
            modalState={tagDelete}
            handleClickParent={handleClickDeleteModal}
            modalContent={<p>¿Desea eliminar la etiqueta {tagDelete.nombre}?</p>}
            handleClickAcceptButton={handleClickAcceptModal}
          />
        )
      }

      <Form />

      <Filter />

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