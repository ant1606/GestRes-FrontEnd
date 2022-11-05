import React from 'react'

import TableRow from '../../Molecules/Tag/TableRow'
import useTag from '../../../Context/TagContext'

const Table = () => {
  const {tags} = useTag();

  return (
    <table className='table-auto w-full'>
      <thead>
        <tr className='text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase '>
          <th className='w-48'>ACCIONES</th>
          <th>ETIQUETA</th>
        </tr>
      </thead>
      <tbody>
        
        {
          //TODO Evaluar cuando no existan resultados y muestre el mensaje resultados no encontrados
          //TODO Generar paginacion de resultados
          tags?.map(tag =>
            <TableRow 
              key={tag.identificador} 
              tag={tag}
              
            />
          )
        }
      </tbody>
    </table>
  )
}

export default Table