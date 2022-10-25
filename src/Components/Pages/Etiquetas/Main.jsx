import React, { useContext, useEffect, useRef, useState } from 'react'
import TitleContext from '../../../Context/TitleContext';
import Field from '../../Atoms/Field';
import Button from '../../Atoms/Button';
import Icon from '@mdi/react';
import { mdiMagnify, mdiPencil, mdiTrashCan } from '@mdi/js';
import { json } from 'react-router-dom';
import Modal from '../../Molecules/Modal';

const Etiquetas = () => {

  const {changeTitle} = useContext(TitleContext);
  
  const [filter, setFilter] = useState('');
  const [tags, setTags] = useState([]);
  const [editTag, setEditTag] = useState({})
  const [deleteTag, setDeleteTag] = useState({})
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const inputRef = useRef();
  

  const query ={
    filter: filter,
  };

  useEffect(()=>{
    changeTitle("Etiquetas");

    fetch('http://localhost/api/tag')
    .then(resp => resp.json())
    .then(data=> setTags(data.data));

  }, []);
  
  const handleSubmit= (e)=>{
    e.preventDefault();
    const sendData = {
      "name" : e.target.etiqueta.value,
      "style" :"bg-gray-700"
    }
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

    e.target.etiqueta.value='';
    // e.target.etiqueta.value.focus();
    document.querySelector('#etiqueta').select();
    
  }

  const handleChangeFilter = (e) => {
    let filter =e.target.value;
    
    fetch(`http://localhost/api/tag?filter=${filter}`)
    .then(resp => resp.json())
    .then(data=> setTags(data.data));
  }

  const handleClickEdit = (tag) => {
    setEditTag(tag);
    document.querySelector('#etiqueta').value = tag.name;
    document.querySelector('#etiqueta').select();
    // console.log(editTag);
  }

  const handleClickCancel = () =>{
    setEditTag({});
    document.querySelector('#etiqueta').value = "";
    document.querySelector('#etiqueta').select();
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

    fetch(`http://localhost/api/tag/${deleteTag.id}`,{
      method: 'delete',       
      // body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
        "accept" : "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data=> setTags(tags => tags.filter(tag => tag.id !== deleteTag.id)  ));

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
      <div className='shadow-2xl p-4 rounded-xl flex flex-col gap-2 mb-14'>
        <h3 className='text-center text-2xl'>Mantenimiento de Etiquetas</h3>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between items-end gap-10 w-full'>
            <Field
              type="text"
              label="Ingrese Etiqueta"
              name="etiqueta"
              classBox="grow"
            />
            <Button
              text="GUARDAR"
              type='submit'
              btnType="main"
              onClick={handleSubmit}
            />
            {
              editTag&&
                <Button
                  text="cancelar"
                  type='submit'
                  btnType="warning"
                  onClick={handleClickCancel}
                />
            }
          </div>
        </form>
      </div>
      {/* Filter */}
      <div className='flex mb-8'>
        <Icon 
          path={mdiMagnify}
          title="Search"
          size={1.50}
          color="black"
        />
        <Field
          type="text"
          label="Buscar Etiqueta"
          name="buscarEtiqueta"
          classBox=""
          handleChange={handleChangeFilter}
        />
      </div>

      {/* Tabla */}
      <table className='table-auto w-full'>
        <thead>
          <tr className='text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase '>
            <th className='w-48'>ACCIONES</th>
            <th>ETIQUETA</th>
          </tr>
        </thead>
        <tbody>
          
          {
            //TODO Evaluar cuando no existan resultados y muestre el mensaje resultados no encontrados
            //TODO Generar paginacion de resultados
            tags?.map(tag =>
              <tr key={tag.id}>
                <td className='w-48 h-14'>
                  <div className="flex justify-around items-center px-3 py-2">
                    <button 
                      className="w-8 h-8  flex justify-center items-center bg-yellow-400 rounded-lg"
                      onClick ={() => {handleClickEdit(tag)}}
                    >
                      <Icon path={mdiPencil}
                        title="Edit"
                        size={1}
                        color="white"
                      />
                    </button>
                    <button 
                      className="w-8 h-8  flex justify-center items-center bg-red-600 rounded-lg"
                      onClick={() => {handleClickDelete(tag)}}
                    >
                      <Icon path={mdiTrashCan}
                        title="Delete"
                        size={1}
                        color="white"
                      />
                    </button>
                  </div>
                </td>
                <td className='max-h-14 max-w-xs'>
                  <div className='flex justify-center items-center'>
                    <span className='bg-gray-900 m-0 h-7 shrink px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase'>
                      {tag.name}
                    </span>
                  </div>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      
    </>
  )
}

export default Etiquetas