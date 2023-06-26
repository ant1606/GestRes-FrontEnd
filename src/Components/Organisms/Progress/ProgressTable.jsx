import React from 'react'
import ProgressTableRow from '../../Molecules/Progress/ProgressTableRow.jsx'
import useRecourse from "../../../Context/RecourseContext.jsx";

const ProgressTable = () => {

    const {recourseActive} = useRecourse();


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
            recourseActive &&
            recourseActive?.progress.map((progress, i)=>{
                if(i+1 === recourseActive?.progress.length){
                    return <ProgressTableRow key={i} last={true} progress={progress}/>
                }
                else {
                    return <ProgressTableRow key={i} progress={progress}/>
                }
            })
        }

        </tbody>
      </table>
  )
}

export default ProgressTable