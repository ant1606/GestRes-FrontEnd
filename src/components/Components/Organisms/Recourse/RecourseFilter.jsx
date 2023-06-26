import React, { useEffect, useState } from 'react'
import Field from '../../Atoms/Field';
import Combobox from '../../Atoms/Combobox';
import useRecourse from "../../../Context/RecourseContext.jsx";
import {useSearchParams} from "react-router-dom";
import perPageItemsValue from "../../../helpers/perPageItemsValue.js";

const RecourseFilter = () => {
  const [typeDataFilter, setTypeDataFilter] = useState();
  const [statusDataFilter, setStatusDataFilter] = useState();
  const [searchNombre, setSearchNombre] = useState();
  const [searchTipo, setSearchTipo] = useState();
  const [searchEstado, setSearchEstado] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const {loadRecourses, recoursePerPage, setRecoursePerPage} = useRecourse();

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
    if(recoursePerPage>0)
      execFilter();
  }, [searchNombre, searchTipo, searchEstado, recoursePerPage]);

  const handleChangeSearchNombre = (e) => {
    setSearchNombre(e.target.value);
  }
  const handleChangeSearchTipo = (e) => {
    setSearchTipo(e.target.value);
  }
  const handleChangeSearchEstado = (e) => {
    setSearchEstado(e.target.value);
  }
  const handleChangeRecordsPerPage = (e) => {
    setRecoursePerPage(parseInt(e.target.value));
  }


  const execFilter = () => {
    //TODO cambiar el filtro de tipo y estado  para evitar enviar en las queryString el ID de los valores
    searchParams.delete('searchNombre');
    searchParams.delete('searchTipo');
    searchParams.delete('searchEstado');
    searchParams.delete('perPage');
    searchParams.append('perPage', recoursePerPage);
    searchParams.delete('page');
    searchParams.append('page', 1);
    if (!!searchNombre && searchNombre !== '')
      searchParams.append('searchNombre', searchNombre);

    if (!!searchTipo && searchTipo !== '0')
      searchParams.append('searchTipo', searchTipo);

    if (!!searchEstado && searchEstado !== '0')
      searchParams.append('searchEstado', searchEstado);

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
            options={typeDataFilter}
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
            options={statusDataFilter}
            value={searchEstado}
            handleChange={handleChangeSearchEstado}
          />
        </div>
        {/*//TODO Crear componente para multiselect de etiqueta*/}
        {/*<div className='basis-1/4 items-end'>*/}
        {/*  <Combobox */}
        {/*    name="etiqueta" */}
        {/*    label="Etiqueta" */}
        {/*    filter={true} */}
        {/*    options={ [ {id: 1, value: "OPCION 1"} ,{id: 2, value: "OPCION 2"} ]}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className='basis-1/4 items-end'>
          <Combobox
              label="Registros por Pagina"
              name="perPage"
              options={perPageItemsValue}
              value={recoursePerPage}
              filter={false}
              classBox="w-32"
              handleChange={handleChangeRecordsPerPage}
          />
        </div>
      </div>
    </div>
  )
}

export default RecourseFilter