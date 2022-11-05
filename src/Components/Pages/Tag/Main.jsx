import React, { useContext, useEffect, useState } from 'react'
import useTag  from '../../../Context/TagContext';
import TitleContext from '../../../Context/TitleContext';
import Modal from '../../Molecules/Modal';
import Filter from '../../Organisms/Tag/Filter';
import Form from '../../Organisms/Tag/Form';
import Table from '../../Organisms/Tag/Table';


const Etiquetas = () => {

  const {loadTags, tags} = useTag();
  const {changeTitle} = useContext(TitleContext);
  

  const [deleteTag, setDeleteTag] = useState({})
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);

  useEffect(()=>{
    changeTitle("Etiquetas");

    loadTags();
  }, []);


  const handleClickDelete = (tag) => {
    setDeleteTag(tag);
    setToggleDeleteModal(!toggleDeleteModal);
  }

  const handleClickDeleteModal = () => {
    //TODO ver como limpiar el state deleteTag luego de cerrar el modal
    setToggleDeleteModal(!toggleDeleteModal);
  }
  const handleClickAcceptModal = () => {
    // console.log(`http://localhost/api/tag/${deleteTag.id}`);

    fetch(`http://localhost/api/tag/${deleteTag.identificador}`,{
      method: 'delete',       
      // body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
        "accept" : "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data=> setTags(tags => tags.filter(tag => tag.identificador !== deleteTag.identificador)  ));

    setToggleDeleteModal(!toggleDeleteModal);
  }

  return (
    <>
      
      {
        toggleDeleteModal && (
          <Modal
            title="Eliminar Etiqueta"
            modalState={toggleDeleteModal}
            handleClickParent={handleClickDeleteModal}
            modalContent={<p>¿Desea eliminar la etiqueta {deleteTag.name}?</p>}
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