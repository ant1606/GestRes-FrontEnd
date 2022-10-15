import React from 'react'
import Button from '../../Atoms/Button'
import Form from '../../Organisms/Recourse/Form'
import { Link } from 'react-router-dom';

const New = () => {
  return (
    <>
      <Form />
      <div className='flex justify-around'>
        <Button text="Registrar" />

        <Link to="/recursos">
          <Button text="Cancelar" btnType="danger" />
        </Link>
      </div> 
    </>
  )
}

export default New