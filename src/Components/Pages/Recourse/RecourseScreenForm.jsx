import React, {useContext, useEffect} from 'react'
import Button from '../../Atoms/Button'
import RecourseForm from '../../Organisms/Recourse/RecourseForm.jsx'
import { Link } from 'react-router-dom';
import TitleContext from "../../../Context/TitleContext.jsx";
import useRecourse from "../../../Context/RecourseContext.jsx";

const RecourseScreenForm = () => {
  const { changeTitle } = useContext(TitleContext);
  const {recourseActive} = useRecourse();

  useEffect(()=>{
    changeTitle(`Recursos Educativos / ${recourseActive===null ? "Nuevo" : "Editar"} `);
  }, []);

  return (
    <>
      <RecourseForm endpoint={"http://localhost/api/recourses"}>
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
      </RecourseForm>
      
    </>
  )
}

export default RecourseScreenForm