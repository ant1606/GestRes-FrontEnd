import React, { useEffect, useState } from 'react'
import Combobox from '../../Atoms/Combobox';
import Field from '../../Atoms/Field';
import {useForm} from "../../../hooks/useForm.js";
import useRecourse from "../../../Context/RecourseContext.jsx";
import GLOBAL_CONSTANTES from "../../../const/globalConstantes.js";
import useSettings from "../../../Context/SettingsContext";
import {
  validateAutor,
  validateEditorial,
  validateNombre,
  validateRuta, validateTotalCapitulos, validateTotalHoras, validateTotalPaginas,
  validateTotalVideos
} from "./RecourseFormValidationInputs.js";


const RecourseForm = ({children}) => {
  const [comboTypeData, setComboTypeData] = useState([]);
  const [typeId, setTypeId] = useState(0);
  const {recourseActive, recourseSaveDB, recourseError} = useRecourse();
  const { settingsType } = useSettings()

  console.log(settingsType);

  const initialState = {
    nombre: 'Mi curso de prueba' ,
    ruta: 'https://www.vimeo.com/sdz/asdLHXCQWE',
    autor: 'yO SOY',
    editorial: 'Editorial pepito',
    totalVideos: 0,
    totalHoras: '00:00:00',
    totalPaginas: 0,
    totalCapitulos: 0,
    tags: [],
    recourseType: settingsType
  };

  const validateInputs = {
    nombre: validateNombre,
    ruta: validateRuta,
    autor: validateAutor,
    editorial: validateEditorial,
    totalVideos: validateTotalVideos,
    totalHoras: validateTotalHoras,
    totalPaginas: validateTotalPaginas,
    totalCapitulos: validateTotalCapitulos,
  };

  //TODO Verificar como poder controlar el combobox desde el useForm (Ver useForm para encontrar el detella del error generado
  const [formValues, handleInputChange, reset] = useForm(initialState, validateInputs, null );
  const { nombre, ruta, autor, editorial, totalVideos, totalHoras, totalPaginas, totalCapitulos, tags } = formValues;

  useEffect(()=> {
    if(settingsType !== null){
      setComboTypeData(settingsType);
      setTypeId(!settingsType ? 0 : settingsType[0].id );
      reset()
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
              errorInput={recourseError.nombre}
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
              errorInput={recourseError.editorial}
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
                  errorInput={recourseError.totalPaginas}
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
                errorInput={recourseError.totalVideos}
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
              errorInput={recourseError.autor}
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
                  errorInput={recourseError.totalCapitulos}
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
                  errorInput={recourseError.totalHoras}
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
              errorInput={recourseError.ruta}

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