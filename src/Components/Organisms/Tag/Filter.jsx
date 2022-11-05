import React from 'react'
import { useSearchParams } from 'react-router-dom'

import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'

import Field from '../../Atoms/Field'
import useTag from '../../../Context/TagContext'

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {loadTags} = useTag();

  const handleChange = (e) => {
    let filter = e.target.value;

    searchParams.delete('searchNombre');

    if (filter !== '') {
      searchParams.delete('page');
      searchParams.append('page', 1);
      searchParams.append('searchNombre', filter);
    }

    searchParams.sort();
    setSearchParams(searchParams);
    loadTags(searchParams.toString());
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
      />
    </div>
  )
}

export default Filter