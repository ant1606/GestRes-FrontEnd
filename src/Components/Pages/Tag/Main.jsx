import React, { useContext, useEffect, useState } from 'react'
import useTag  from '../../../Context/TagContext';
import TitleContext from '../../../Context/TitleContext';
import Modal from '../../Molecules/Modal';
import Filter from '../../Organisms/Tag/Filter';
import Form from '../../Organisms/Tag/Form';
import Table from '../../Organisms/Tag/Table';


const Etiquetas = () => {

  const {loadTags, tagDelete, deletedTag, destroyTag} = useTag();
  const {changeTitle} = useContext(TitleContext);

  useEffect(()=>{
    changeTitle("Etiquetas");

    loadTags();
  }, []);

  const handleClickDeleteModal = () => {
    deletedTag(null);
  }
  const handleClickAcceptModal = () => {
    destroyTag();
    deletedTag(null);
  }

  // console.log(tagDelete);
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
    </>
  )
}

export default Etiquetas