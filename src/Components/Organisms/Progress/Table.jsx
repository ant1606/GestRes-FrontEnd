import React from 'react'
import ProgressTableRow from '../../Molecules/Progress/TableRow'

const Table = () => {
  const dataDump = [
    { posicion: 'primero'},
    {posicion: 'segundo' },
    {posicion: 'tercero'},
    {posicion: 'cuarto'},
  ];

  return (
    <table className='table-auto w-full mt-8'>
        <thead>
          <tr className='text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase '>
            <th className='w-36 '>ACCIONES</th>
            <th className='w-32 '>FECHA</th>
            <th className='w-36 '>AVANCE</th>
            <th className='w-36 '>PENDIENTE</th>
            <th className=''>COMENTARIO</th>
          </tr>
        </thead>
        <tbody>
        {
          dataDump.map((d, i) => {
            if(i+1 === dataDump.length){
              return <ProgressTableRow key={i} last={true} comentario={d.posicion}/>
            }
            else {
              return <ProgressTableRow key={i} comentario={d.posicion}/>
            }
          })
          }
        </tbody>
      </table>
  )
}

export default Table