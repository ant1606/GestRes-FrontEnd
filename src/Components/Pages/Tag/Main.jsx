import React, { useContext, useEffect  } from 'react'
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

import useTag  from '../../../Context/TagContext';
import TitleContext from '../../../Context/TitleContext';

import Modal from '../../Molecules/Modal';
import Filter from '../../Organisms/Tag/Filter';
import Form from '../../Organisms/Tag/Form';
import Table from '../../Organisms/Tag/Table';


const Etiquetas = () => {

  const {loadTags, tagDelete, deletedTag, destroyTag, tagMeta} = useTag();
  const {changeTitle} = useContext(TitleContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect( ()=>{
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

  const handlePageClick = (e) => {    
    searchParams.delete('page');
    searchParams.append('page', e.selected+1);
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

      <Table />

      {
        tagMeta && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={tagMeta.perPage}
            pageCount={tagMeta.totalPages}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        )
      }
      
    </>
  )
}

export default Etiquetas