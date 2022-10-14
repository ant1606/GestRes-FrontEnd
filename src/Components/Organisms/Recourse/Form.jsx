import React, { useContext, useEffect } from 'react'
import TitleContext from '../../../Context/TitleContext';
import Combobox from '../../Atoms/Combobox';
import Field from '../../Atoms/Field';

const RecourseForm = () => {
  const {changeTitle} = useContext(TitleContext);

  useEffect(()=>{
    changeTitle("Recursos Educativos / Nuevo");
  }, []);

  return (
    <>
      <div className='flex flex-col'>

        <div className='flex w-full gap-10 my-5'>
          <Field type="text" label="Nombre" id="nombre"
              classBox="basis-3/4"
          />
          <Combobox name="tipo" label="Tipo" options={["VIDEO TUTORIAL", "LIBRO ELECTRÓNICO"]} filter={false}
              classBox="basis-1/4"/>
        </div>

        <div className='flex gap-10 my-5' >
          <Field type="text" label="Editorial" id="editorial"
              classBox="basis-3/4"
          />
          <Field type="text" label="Total Videos" id="totalVideos"
              classBox="basis-1/4"
          />
        </div>

        <div className='flex gap-10 my-5'>
          <Field type="text" label="Autor" id="autor"
              classBox="basis-3/4"
          />
          <Field type="text" label="Total Horas" id="totalHoras"
              classBox="basis-1/4"
          />
        </div>

        <div className='my-5' >
          <Field type="text" label="Ruta" id="ruta"/>
        </div>

        <div className='mt-5 mb-32'>
          <Field type="text" label="Etiquetas" id="etiqueta"/>
        </div>

        
      </div>
    </>
  )
}

export default RecourseForm