import React from 'react'
import { useSearchParams } from 'react-router-dom'
import useTag from '../../../Context/TagContext'
import Button from '../../Atoms/Button'
import Field from '../../Atoms/Field'

const Form = () => {
  
  const {savingTagInDb, tagActive, selectedTag, loadTags} = useTag();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e) =>{
    e.preventDefault();
    const sendData = {
      "nombre" : e.target.nombre.value,
      "estilos" :"bg-gray-700"
    }

    savingTagInDb(sendData);

    e.target.nombre.value='';
    document.querySelector('#nombre').select();
    loadTags(searchParams.toString());
  }

  const handleClickCancel = () =>{
    selectedTag(null);
    document.querySelector('#nombre').value = "";
    document.querySelector('#nombre').select();
  }

  return (

    <div className='shadow-2xl p-4 rounded-xl flex flex-col gap-2 mb-14'>
      <h3 className='text-center text-2xl'>Mantenimiento de Etiquetas</h3>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between items-end gap-10 w-full'>
          <Field
            type="text"
            label="Ingrese Etiqueta"
            name="nombre"
            classBox="grow"
          />
          <Button
            text="GUARDAR"
            type='submit'
            btnType="main"
          />
          
          {
            
            tagActive &&(
              <Button
                text="CANCELAR"
                btnType="warning"
                handleClick={handleClickCancel} 
              />
              )
          }
        </div>
      </form>
    </div>
  )
}

export default Form