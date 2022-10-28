import React from 'react'
import { mdiPencil, mdiTrashCan } from '@mdi/js'
import Icon from '@mdi/react'

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
            <tr key={tag.id}>
              <td className='w-48 h-14'>
                <div className="flex justify-around items-center px-3 py-2">
                  <button 
                    className="w-8 h-8  flex justify-center items-center bg-yellow-400 rounded-lg"
                    onClick ={() => {handleClickEdit(tag)}}
                  >
                    <Icon path={mdiPencil}
                      title="Edit"
                      size={1}
                      color="white"
                    />
                  </button>
                  <button 
                    className="w-8 h-8  flex justify-center items-center bg-red-600 rounded-lg"
                    onClick={() => {handleClickDelete(tag)}}
                  >
                    <Icon path={mdiTrashCan}
                      title="Delete"
                      size={1}
                      color="white"
                    />
                  </button>
                </div>
              </td>
              <td className='max-h-14 max-w-xs'>
                <div className='flex justify-center items-center'>
                  <span className='bg-gray-900 m-0 h-7 shrink px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase'>
                    {tag.name}
                  </span>
                </div>
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

export default Table