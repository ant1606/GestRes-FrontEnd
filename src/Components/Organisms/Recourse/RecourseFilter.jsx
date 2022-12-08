import React, { useEffect, useState } from 'react'
import { mdiMagnify} from '@mdi/js';
import Icon from '@mdi/react'
import Field from '../../Atoms/Field';
import Combobox from '../../Atoms/Combobox';
import useRecourse from "../../../Context/RecourseContext.jsx";
import {useSearchParams} from "react-router-dom";

const RecourseFilter = () => {
  const [typeDataFilter, setTypeDataFilter] = useState();
  const [statusDataFilter, setStatusDataFilter] = useState();
  const [searchNombre, setSearchNombre] = useState();
  const [searchTipo, setSearchTipo] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const {loadRecourses} = useRecourse();

  const getFilterData =  (val) => {
    return  fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/settings/${val}`)
    .then((response) => response.json())
    .then((data)=> data.data);
  }

  const initFilters = async () => {
    let tempTypeDataFilter = await  getFilterData(import.meta.env.VITE_SETTINGS_TYPE);
    let tempStatusDataFilter =  await getFilterData(import.meta.env.VITE_SETTINGS_STATUS);
    setTypeDataFilter(tempTypeDataFilter);
    setStatusDataFilter(tempStatusDataFilter);
  }

  useEffect(() => {
    initFilters();
  }, []);

  useEffect(()=>{
    // console.log(searchNombre);
    execFilter();
    console.log(searchTipo);
  }, [searchNombre, searchTipo]);

  const handleChangeSearchNombre = (e) => {
    setSearchNombre(e.target.value);
  }
  const handleChangeSearchTipo = (e) => {
    setSearchTipo(e.target.value);
  }

  const execFilter = () => {
    searchParams.delete('searchNombre');
    searchParams.delete('searchTipo');
    // searchParams.delete('perPage');
    // searchParams.append('perPage', tagPerPage);
    searchParams.delete('page');
    searchParams.append('page', 1);
    if (!!searchNombre && searchNombre !== '')
      searchParams.append('searchNombre', searchNombre);

    if (!!searchTipo && searchTipo !== '0')
      searchParams.append('searchTipo', searchTipo);

    searchParams.sort();
    setSearchParams(searchParams);
    loadRecourses(searchParams.toString());
  }
  
  return (
    <div className='shadow-2xl p-4 rounded-xl flex flex-col gap-6 mb-16'>
      <p>Filtros</p>
      <div className='flex justify-between items-center gap-12'>
        <div className='basis-1/4 items-end'>
          <Field 
            type="text" 
            label="Nombre" 
            id="nombre"
            name="nombre"
            value={searchNombre}
            handleChange={handleChangeSearchNombre}
          />
        </div>
        <div className='basis-1/4 items-end'>
          <Combobox 
            name="tipo" 
            label="Tipo" 
            options={ typeDataFilter}
            filter={true}
            value={searchTipo}
            handleChange={handleChangeSearchTipo}

          />
        </div>
        <div className='basis-1/4 items-end'>
          <Combobox 
            name="estado" 
            label="Estado" 
            filter={true} 
            options={ statusDataFilter}
          />
        </div>
        <div className='basis-1/4 items-end'>
          <Combobox 
            name="etiqueta" 
            label="Etiqueta" 
            filter={true} 
            options={ [ {id: 1, value: "OPCION 1"} ,{id: 2, value: "OPCION 2"} ]}
          />
        </div>
        <button className='bg-gray-900 hover:bg-gray-800 text-white font-bold p-1 rounded-md'>
          <Icon 
            path={mdiMagnify}
            title="Search"
            size={1.25}
            color="white"
          />
        </button>
      </div>
    </div>
  )
}

export default RecourseFilter