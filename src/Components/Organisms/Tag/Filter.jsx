import React from 'react'
import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import Field from '../../Atoms/Field'

const Filter = ({handleChangeFilter}) => {
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
          handleChange={handleChangeFilter}
        />
    </div>
  )
}

export default Filter