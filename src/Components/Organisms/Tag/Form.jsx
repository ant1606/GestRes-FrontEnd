import React from 'react'
import { useSearchParams } from 'react-router-dom'
import useTag from '../../../Context/TagContext'
import Button from '../../Atoms/Button'
import Field from '../../Atoms/Field'

const Form = () => {

  const { savingTagInDb, tagActive, selectedTag, addNewError, tagError } = useTag();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.nombre.value.trim() === '') {
      addNewError({ [e.target.nombre.name]: "El nombre de etiqueta es requerido" });
      document.querySelector('#nombre').select();
      return;
    }

    const sendData = {
      "nombre": e.target.nombre.value,
      "estilos": "bg-gray-700"
    }

    const resp = await savingTagInDb(sendData, searchParams.toString());

    if (resp) {
      e.target.nombre.value = '';
    }

    document.querySelector('#nombre').select();
  }

  const handleClickCancel = () => {
    selectedTag(null);
    document.querySelector('#nombre').value = "";
    document.querySelector('#nombre').select();
  }

  const handleChange = (e) => {
    if (e.target.value.trim() === '') {
      addNewError({ [e.target.name]: "El nombre de etiqueta es requerido" });
    }
    else {
      addNewError({ [e.target.name]: null });
    }
  }

  return (

    <div className='shadow-2xl p-4 h-32 rounded-xl flex flex-col gap-2 mb-14'>
      <h3 className='text-center text-2xl'>Mantenimiento de Etiquetas</h3>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between items-end gap-10 w-full '>
          <div className='flex flex-col grow relative'>

            <Field
              type="text"
              label="Ingrese Etiqueta"
              name="nombre"
              classBox="grow"
              handleChange={handleChange}
              errorInput={tagError.nombre}
            />
            {
              tagError.nombre &&
              (
                <span className='text-xs absolute -bottom-5 z-10 text-red-500 font-bold'>{tagError.nombre}</span>
              )
            }

          </div>
          <Button
            text="GUARDAR"
            type='submit'
            btnType="main"
          />

          {

            tagActive && (
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