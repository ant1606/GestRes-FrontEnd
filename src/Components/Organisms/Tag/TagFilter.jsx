import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'

import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'

import Field from '../../Atoms/Field'
import useTag from '../../../Context/TagContext'
import Combobox from "../../Atoms/Combobox.jsx";
import perPageItemsValue from "../../../helpers/perPageItemsValue.js";

const TagFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchNombre, setSearchNombre] = useState('');
  const {loadTags, setTagPerPage, tagPerPage} = useTag();

  useEffect(()=>{
      if(tagPerPage>0)
        execFilter();
    },[searchNombre, tagPerPage]);

  const execFilter = () => {
    searchParams.delete('searchNombre');
    searchParams.delete('perPage');
    searchParams.append('perPage', tagPerPage);
    searchParams.delete('page');
    searchParams.append('page', 1);
    if (searchNombre !== '')
      searchParams.append('searchNombre', searchNombre);

    searchParams.sort();
    setSearchParams(searchParams);
    loadTags(searchParams.toString());
  }

  const handleChange = (e) => {
    setSearchNombre(e.target.value);
  }

  const handleChangeCombo = (e) => {
      setTagPerPage(parseInt(e.target.value));
  }

  return (
    <div className='flex mb-4 gap-x-10'>
        <div className='flex'>
            <Icon
                path={mdiMagnify}
                title="Search"
                size={1.50}
                color="black"
            />
            <Field
            type="text"
            label="Buscar Etiqueta"
            name="buscarEtiqueta"
            classBox=""
            handleChange={handleChange}
            value={searchNombre}
          />
        </div>
        <Combobox
            label="Registros por Pagina"
            name="perPage"
            options={perPageItemsValue}
            handleChange={handleChangeCombo}
            filter={false}
            classBox="w-32"
            value={tagPerPage}
        />
    </div>
  )
}




export default TagFilter