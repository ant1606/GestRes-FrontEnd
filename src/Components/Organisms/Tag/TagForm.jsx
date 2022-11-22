import React, {useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import useTag from '../../../Context/TagContext'
import Button from '../../Atoms/Button'
import Field from '../../Atoms/Field'
import {useForm} from "../../../hooks/useForm.js";
import {validateTagNombre} from "./TagFormValidationInputs.js";

const validateFunctionsFormInputs = {
  nombre: validateTagNombre
};

const initialFormValues = {
  nombre: ''
};

const TagForm = () => {

  const { savingTag, updatingTag, tagActive, selectedTag, addNewError, tagError } = useTag();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialState = !!tagActive ? tagActive : initialFormValues;
  const [formValues, handleInputChange, reset, validatedSubmitForm] = useForm(initialState, validateFunctionsFormInputs, addNewError );
  const {nombre} = formValues;

  useEffect(()=>{
    reset();
  }, [tagActive])

  const handleSubmit = async (e) => {
    e.preventDefault();

    await validatedSubmitForm();
    const isValid =Object.keys(tagError).every(el=>tagError[el]===null);

    if(isValid){
      let res =!tagActive ? await savingTag(formValues, searchParams) : await updatingTag(formValues);
      if(res){
        reset();
        addNewError([]);
      }
    }

    document.querySelector('#nombre').select();
  }

  const handleClickCancel = () => {
    selectedTag(null);
    addNewError([]);
    document.querySelector('#nombre').select();
  }

  return (

    <div className='shadow-md p-4 h-32 rounded-xl flex flex-col gap-2 mb-10'>
      <h3 className='text-center text-2xl'>Mantenimiento de Etiquetas</h3>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between items-end gap-10 w-full '>
          <div className='flex flex-col grow relative'>

            <Field
              type="text"
              label="Ingrese Etiqueta"
              name="nombre"
              classBox="grow"
              handleChange={handleInputChange}
              errorInput={tagError.nombre}
              value={nombre}
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

export default TagForm