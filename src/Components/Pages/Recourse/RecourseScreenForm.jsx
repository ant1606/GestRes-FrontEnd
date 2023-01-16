import React, {useContext, useEffect} from 'react'
import Button from '../../Atoms/Button'
import RecourseForm from '../../Organisms/Recourse/RecourseForm.jsx'
import { Link } from 'react-router-dom';
import TitleContext from "../../../Context/TitleContext.jsx";
import useRecourse from "../../../Context/RecourseContext.jsx";
import useSettings from "../../../Context/SettingsContext.jsx";

const RecourseScreenForm = () => {
  const { changeTitle } = useContext(TitleContext);
  const {recourseActive, cleanRecourseActive} = useRecourse();

  useEffect(()=>{
    console.log(recourseActive);
    changeTitle(`Recursos Educativos / ${recourseActive===null ? "Nuevo" : "Editar"} `);
    return (()=>{
      cleanRecourseActive();
    });
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