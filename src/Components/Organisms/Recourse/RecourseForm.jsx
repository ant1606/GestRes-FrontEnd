import React, { useContext, useEffect, useState } from 'react'
import TitleContext from '../../../Context/TitleContext';
import Combobox from '../../Atoms/Combobox';
import Field from '../../Atoms/Field';
import {useForm} from "../../../hooks/useForm.js";
import useRecourse from "../../../Context/RecourseContext.jsx";
import {useLoadComboData} from "../../../hooks/useLoadComboData.js";
import useSettings from "../../../Context/SettingsContext.jsx";
import GLOBAL_CONSTANTES from "../../../const/globalConstantes.js";

const RecourseForm = ({endpoint, children}) => {
  const [comboTypeData, setComboTypeData] = useState([]);
  const [typeId, setTypeId] = useState(0);
  const {recourseActive, recourseSaveDB} = useRecourse();
  const { settingsType } =useSettings();
  const initialState = {
    nombre: 'Mi curso de prueba' ,
    ruta: 'https://www.vimeo.com/sdz/asdLHXCQWE',
    autor: 'yO SOY',
    editorial: 'Editorial pepito',
    totalVideos: 0,
    totalHoras: '00:00:00',
    totalPaginas: 0,
    totalCapitulos: 0,
    tags: []
  };

  //TODO Verificar como poder controlar el combobox desde el useForm (Ver useForm para encontrar el detella del error generado
  const [formValues, handleInputChange] = useForm(initialState);
  const { nombre, ruta, autor, editorial, totalVideos, totalHoras, totalPaginas, totalCapitulos, tags } = formValues;

  useEffect(()=> {
    if(settingsType !== null){
      setComboTypeData(settingsType);
      setTypeId(!settingsType ? 0 : settingsType[0].id );
    }
  }, [settingsType, ]);

  const handleComboChange = (e) => {
    setTypeId(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO Queda pendiente la obtencion de las etiquetas

    if(recourseActive===null){
      recourseSaveDB({...formValues, tipoId : typeId});
    } else {
      console.log("Actualizar el recurso");
    }

  }

  return (
    <>
      <form className='flex flex-col' onSubmit={handleSubmit}>

        <div className='flex w-full gap-10 my-5'>
          <Field 
              type="text" 
              label="Nombre" 
              name="nombre"
              classBox="basis-3/4"
              handleChange={handleInputChange}
              value={nombre}
          />

          <Combobox
              name="tipoId"
              label="Tipo"
              options={comboTypeData}
              filter={false}
              classBox="basis-1/4"
              handleChange={handleComboChange}
              value={typeId}
          />
        </div>

        <div className='flex gap-10 my-5' >
          <Field 
              type="text" 
              label="Editorial" 
              name="editorial"
              classBox="basis-3/4"
              handleChange={handleInputChange}
              value={editorial}
          />

          {
            parseInt(typeId) === settingsType?.find(val => val.key === GLOBAL_CONSTANTES.RECOURSE_TYPE_LIBRO).id ?
              (
                <Field 
                  type="text" 
                  label="Total Paginas" 
                  name="totalPaginas"
                  classBox="basis-1/4"
                  handleChange={handleInputChange}
                  value={totalPaginas}
                />
              ) 
            : 
              (
                <Field 
                type="text" 
                label="Total Videos" 
                name="totalVideos"
                classBox="basis-1/4"
                handleChange={handleInputChange}
                value={totalVideos}
              />
              ) 
          }
        </div>

        <div className='flex gap-10 my-5'>
          <Field 
              type="text" 
              label="Autor" 
              name="autor"
              classBox="basis-3/4"
              handleChange={handleInputChange}
              value={autor}
          />

          {
            parseInt(typeId) === settingsType?.find(val => val.key === GLOBAL_CONSTANTES.RECOURSE_TYPE_LIBRO).id  ?
              (
                <Field 
                  type="text" 
                  label="Total Capitulos" 
                  name="totalCapitulos"
                  classBox="basis-1/4"
                  handleChange={handleInputChange}
                  value={totalCapitulos}
                />
                
              ) 
            : 
              (
                <Field 
                  type="text" 
                  label="Total Horas" 
                  name="totalHoras"
                  classBox="basis-1/4"
                  handleChange={handleInputChange}
                  value={totalHoras}
                />
              ) 
          }
        </div>

        <div className='my-5' >
          <Field 
              type="text" 
              label="Ruta" 
              name="ruta"
              handleChange={handleInputChange}
              value={ruta}
          />
        </div>

        <div className='mt-5 mb-32'>
          <Field 
              type="text" 
              label="Etiquetas" 
              name="etiqueta"
              value={tags}
              handleChange={handleInputChange}
          />
        </div>

        {children}
      </form>
    </>
  )
}

export default RecourseForm