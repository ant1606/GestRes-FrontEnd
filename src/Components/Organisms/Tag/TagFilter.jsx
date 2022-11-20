import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'

import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'

import Field from '../../Atoms/Field'
import useTag from '../../../Context/TagContext'

const TagFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchNombre, setSearchNombre] = useState('');
  const {loadTags} = useTag();


  useEffect(()=>{
    console.log(searchNombre);
    execFilter();
    },
    [searchNombre]
  );

  const execFilter = () => {
    searchParams.delete('searchNombre');

    if (searchNombre !== '') {
      searchParams.delete('page');
      searchParams.append('page', 1);
      searchParams.append('searchNombre', searchNombre);
    }

    searchParams.sort();
    setSearchParams(searchParams);
    loadTags(searchParams.toString());
  }

  const handleChange = (e) => {
    setSearchNombre(e.target.value);
  }

  return (
    <div className='flex mb-8'>
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
  )
}

export default TagFilter