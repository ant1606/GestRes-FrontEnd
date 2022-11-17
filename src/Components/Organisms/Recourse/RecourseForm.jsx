import React, { useContext, useEffect, useState } from 'react'
import TitleContext from '../../../Context/TitleContext';
import Combobox from '../../Atoms/Combobox';
import Field from '../../Atoms/Field';
import {useForm} from "../../../hooks/useForm.js";
import useRecourse from "../../../Context/RecourseContext.jsx";
import {useLoadComboData} from "../../../hooks/useLoadComboData.js";

const initialState = {
  nombre: '' ,
  ruta: '',
  autor: '',
  editorial: '',
  tipoId: 0,
  totalVideos: 0,
  totalHoras: '00:00:00',
  totalPaginas: 0,
  totalCapitulos: 0,
  tags: []
};

const RecourseForm = ({endpoint, children}) => {
  const {recourseActive, recourseSaveDB} = useRecourse();
  // const [comboTypeData, setComboTypeData] = useState([]);
  const [formValues, handleInputChange, , resetValue ] = useForm(initialState);
  const [comboData, fetchData] = useLoadComboData();
  const {
    nombre,
    ruta,
    autor,
    editorial,
    tipoId,
    totalVideos,
    totalHoras,
    totalPaginas,
    totalCapitulos,
    tags
  } = formValues;


    useEffect(()=> {
        fetchData(`settings/${import.meta.env.VITE_SETTINGS_TYPE}`);
        // loadComboData(formValues.tipoId);
        // console.log(tipoId);
    }, []);

  useEffect(() => {
    // resetValue(totalPaginas);
    // resetValue(totalCapitulos);
    // resetValue(totalVideos);
    // resetValue(totalHoras);
  }, [tipoId])



  // TODO Pensar en realizar un hook personalizado para la carga de los combobox
  // const loadComboData =   (tipoId) => {
  //    fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/settings/${import.meta.env.VITE_SETTINGS_TYPE}`)
  //       .then( res => res.json())
  //       .then(data => {
  //         setComboTypeData(data.data);
  //         tipoId = data.data[0]?.id;
  //         console.log(tipoId);
  //       });
  // }



  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO Queda pendiente la obtencion de las etiquetas

    if(recourseActive===null){
      recourseSaveDB({...formValues});
    } else {
      console.log("Actualizar el recurso");
    }

  }

  return (
    <>
      <form className='flex flex-col' onSubmit={handleSubmit}>
    <p>{tipoId}</p>
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
              options={comboData}
              filter={false}
              classBox="basis-1/4"
              handleChange={handleInputChange}
              value={tipoId}
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
            parseInt(tipoId) === 1 ?
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
            parseInt(tipoId) === 1 ?
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