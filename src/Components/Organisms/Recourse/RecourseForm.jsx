import React, { useContext, useEffect, useState } from 'react'
import TitleContext from '../../../Context/TitleContext';
import Combobox from '../../Atoms/Combobox';
import Field from '../../Atoms/Field';

const RecourseForm = ({endpoint, children}) => {
  const {changeTitle} = useContext(TitleContext);
  const [recourseTypeId, setRecourseTypeId] = useState(1);
  
  useEffect(()=>{
    changeTitle("Recursos Educativos / Nuevo");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let totalPaginasTemp = null;
    let totalCapitulosTemp= null;
    let totalVideosTemp = null;
    let totalHorasTemp = null;
    
    
    if (recourseTypeId === 1){
      totalPaginasTemp = e.target.totalPaginas.value;
      totalCapitulosTemp = e.target.totalCapitulos.value;
    }
    if (recourseTypeId === 2){
      totalVideosTemp = e.target.totalVideos.value;
      totalHorasTemp = e.target.totalHoras.value;
    }
    
    //TODO hacer la obtencion de las etiquetas
    const recourseObj = {
      name: e.target.nombre.value,
      source: e.target.ruta.value,
      author: e.target.autor.value,
      editorial: e.target.editorial.value,
      type_id: e.target.tipo.value,
      total_pages: totalPaginasTemp,
      total_chapters: totalCapitulosTemp,
      total_videos: totalVideosTemp,
      total_hours: totalHorasTemp,
    };

    fetch(endpoint, {
      method: 'post',
      body: JSON.stringify(recourseObj),
      headers: { 
        "Content-Type" : "application/json",
        "accept" : "application/json"
      }
    })
    .then((response) => { 
      return response.json();
    })
    .then((data)=>  {
      console.log(data.status);
      if(data.code === 422){
        console.log("Existe un error");
        return Promise.reject(data);
        // throw Error(data);
      }
      // if(data.error)

      console.log(data.data);
    })
    .catch((error) => {console.log("Hubo un error " + error)})

    // console.log(obj);
    // console.log(JSON.stringify(recourseObj));
  }

  const handleChangeTypeIdRecourse = (e) => {
    setRecourseTypeId(parseInt(e.target.value));
    // console.log(recourseTypeId);
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
          />
          <Combobox 
              name="tipo" 
              label="Tipo" 
              options={[{id: 1, value :"Opcion 1"}, {id: 2, value :"Opcion 2"} ]} 
              filter={false}
              classBox="basis-1/4"
              handleChangeParent={handleChangeTypeIdRecourse}
              selectedParent={recourseTypeId}
          />
        </div>

        <div className='flex gap-10 my-5' >
          <Field 
              type="text" 
              label="Editorial" 
              name="editorial"
              classBox="basis-3/4"
          />

          {
            recourseTypeId === 1 ? 
              (
                <Field 
                  type="text" 
                  label="Total Paginas" 
                  name="totalPaginas"
                  classBox="basis-1/4"
                />
              ) 
            : 
              (
                <Field 
                type="text" 
                label="Total Videos" 
                name="totalVideos"
                classBox="basis-1/4"
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
          />

          {
            recourseTypeId === 1 ? 
              (
                <Field 
                  type="text" 
                  label="Total Capitulos" 
                  name="totalCapitulos"
                  classBox="basis-1/4"
                />
                
              ) 
            : 
              (
                <Field 
                  type="text" 
                  label="Total Horas" 
                  name="totalHoras"
                  classBox="basis-1/4"
                />
              ) 
          }
        </div>

        <div className='my-5' >
          <Field 
              type="text" 
              label="Ruta" 
              name="ruta"
          />
        </div>

        <div className='mt-5 mb-32'>
          <Field 
              type="text" 
              label="Etiquetas" 
              name="etiqueta"
          />
        </div>

        {children}
      </form>
    </>
  )
}

export default RecourseForm