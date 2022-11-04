import React, { useContext, useEffect, useState } from 'react'
import useTag, { TagProvider } from '../../../Context/TagContext';
import TitleContext from '../../../Context/TitleContext';
import Modal from '../../Molecules/Modal';
import Filter from '../../Organisms/Tag/Filter';
import Form from '../../Organisms/Tag/Form';
import Table from '../../Organisms/Tag/Table';


const Etiquetas = () => {

  const {changeTitle} = useContext(TitleContext);
  
  const [filter, setFilter] = useState('');

  const [tags, setTags] = useState([]);
  const [editTag, setEditTag] = useState({})
  const [deleteTag, setDeleteTag] = useState({})
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);

  const query ={
    filter: filter,
  };

  useEffect(()=>{
    changeTitle("Etiquetas");

    fetch('http://localhost/api/tag')
    .then(resp => resp.json())
    .then(data=> setTags(data.data));
    // setTags(data.data)
  }, []);
  
  const handleSubmit= (e)=>{
    e.preventDefault();
    
    const sendData = {
      "nombre" : e.target.nombre.value,
      "estilos" :"bg-gray-700"
    }

    if(JSON.stringify(editTag) !== "{}") {

      fetch(`http://localhost/api/tag/${editTag.identificador}`,{
        method: 'put',       
        body: JSON.stringify({
          ...sendData, 
          identificador:editTag.identificador
        }),
        headers: {
          "Content-Type": "application/json",
          "accept" : "application/json"
        }
      })
      .then(resp => resp.json())
      .then(data => setTags((tags) => tags.map(tag => tag.identificador===editTag.identificador ? data.data : tag)))
      .catch(err => console.log(err));
        // 
      setEditTag({});
    }
    else {
      fetch('http://localhost/api/tag',{
        method: 'post',       
        body: JSON.stringify(sendData),
        headers: {
          "Content-Type": "application/json",
          "accept" : "application/json"
        }
      })
      .then(resp => resp.json())
      .then(data=> setTags([...tags, data.data]));
    }

    e.target.nombre.value='';
    // e.target.etiqueta.value.focus();
    document.querySelector('#nombre').select();
  }
  

  const handleChangeFilter = (e) => {
    let filter =e.target.value;
    
    fetch(`http://localhost/api/tag?searchNombre=${filter}`)
    .then(resp => resp.json())
    .then(data=> setTags(data.data));
  }

  const handleClickEdit = (tag) => {
    setEditTag(tag);
    document.querySelector('#nombre').value = tag.nombre;
    document.querySelector('#nombre').select();
    // console.log(editTag);
  }

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

      <Form 
        editTag ={editTag}
      />

      <Filter 
        handleChangeFilter={handleChangeFilter}
      />

      <Table 
        tags={tags} 
        handleClickDelete={handleClickDelete} 
        handleClickEdit={handleClickEdit}
      />
    </>
  )
}

export default Etiquetas