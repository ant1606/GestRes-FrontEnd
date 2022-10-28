import React from 'react'
import { mdiPencil, mdiTrashCan } from '@mdi/js'
import Icon from '@mdi/react'
import TableRow from '../../Molecules/Tag/TableRow'

const Table = ({tags, handleClickEdit, handleClickDelete }) => {
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
              key={tag.id} 
              tag={tag}
              handleClickDelete={handleClickDelete}
              handleClickEdit={handleClickEdit}
            />
          )
        }
      </tbody>
    </table>
  )
}

export default Table