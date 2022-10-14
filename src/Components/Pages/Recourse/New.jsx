import React from 'react'
import Button from '../../Atoms/Button'
import Form from '../../Organisms/Recourse/Form'

const New = () => {
  return (
    <>
      <Form />
      <div className='flex justify-around'>
        <Button text="Registrar"></Button>
        <Button text="Cancelar"></Button>
      </div> 
    </>
  )
}

export default New