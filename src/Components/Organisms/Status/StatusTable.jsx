import React from 'react'
import StatusTableRow from '../../Molecules/Status/StatusTableRow.jsx'
import useRecourse from "../../../Context/RecourseContext.jsx";

const StatusTable = () => {
    const {recourseActive} = useRecourse();

  return (
    <table className='table-auto w-full mt-8'>
      <thead>
        <tr className='text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase'>
          <th className='w-36'>ACCIONES</th>
          <th className='w-32'>FECHA</th>
          <th className='w-44'>ESTADO</th>
          <th className=''>COMENTARIO</th>
        </tr>
      </thead>
      <tbody>

        {
            recourseActive &&
            recourseActive?.status.map((status, i)=>{
                if(i+1 === recourseActive?.status.length){
                    return <StatusTableRow key={i} last={true} status={status}/>
                }
                else {
                    return <StatusTableRow key={i} status={status}/>
                }
            })
        }

      </tbody>
    </table>
  )
}

export default StatusTable