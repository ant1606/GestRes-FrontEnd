import React from 'react'
import Button from '../../Atoms/Button'
import Form from '../../Organisms/Recourse/Form'
import { Link } from 'react-router-dom';

const RecourseScreenNew = () => {
  
  return (
    <>
      <Form endpoint={"http://localhost/api/recourses"}>
        <div className='flex justify-around'>
          <Button 
              type="submit"
              text="Registrar" 
          />

          <Link to="/recursos">
            <Button 
                btnType="danger" 
                text="Cancelar" 
          />
          </Link>
        </div> 
      </Form>
      
    </>
  )
}

export default RecourseScreenNew