import React from 'react'
import { mdiMagnify} from '@mdi/js';
import Icon from '@mdi/react'
import Field from '../../Atoms/Field';
import Combobox from '../../Atoms/Combobox';

const Filter = () => {
  return (
    <div className='shadow-2xl p-4 rounded-xl flex flex-col gap-6 mb-16'>
      <p>Filtros</p>
      <div className='flex justify-between items-center gap-12'>
        <div className='basis-1/4 items-end'>
          <Field type="text" label="Nombre" id="nombre"/>
        </div>
        <div className='basis-1/4 items-end'>
          <Combobox name="tipo" label="Tipo" options={["VIDEO TUTORIAL", "LIBRO ELECTRÓNICO"]} filter={true}/>
        </div>
        <div className='basis-1/4 items-end'>
          <Combobox name="estado" label="Estado" filter={true} options={["REGISTRADO", "POR EMPEZAR","EN PROCESO" ]}/>
        </div>
        <div className='basis-1/4 items-end'>
          <Combobox name="etiqueta" label="Etiqueta" filter={true} options={["VIDEO TUTORIAL", "LIBRO ELECTRÓNICO"]}/>
        </div>
        <button className='bg-gray-900 hover:bg-gray-800 text-white font-bold p-1 rounded-md'>
          <Icon path={mdiMagnify}
                  title="Search"
                  size={1.25}
                  color="white"
                  />
        </button>
      </div>
    </div>
  )
}

export default Filter