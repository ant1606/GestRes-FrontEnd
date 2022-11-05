import React from 'react'
import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import Field from '../../Atoms/Field'
import useTag from '../../../Context/TagContext'

const Filter = () => {
  const {loadTags} = useTag();

  const handleChange = (e) =>{
    let filter = e.target.value;
    loadTags(filter);
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