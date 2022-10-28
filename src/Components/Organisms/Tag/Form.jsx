import React from 'react'
import Button from '../../Atoms/Button'
import Field from '../../Atoms/Field'

const Form = ({handleSubmit, handleClickCancel, editTag={}}) => {
  return (
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
          />
          
          {
            JSON.stringify(editTag) !== "{}" &&(
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