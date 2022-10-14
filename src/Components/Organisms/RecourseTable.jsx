import RecourseTableRow from '../Molecules/RecourseTableRow';

const RecourseTable = () => {
  return (
    <table className='table-auto w-full'>
      <thead>
        <tr className='text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase '>
          <th className='w-48'>ACCIONES</th>
          <th>NOMBRE</th>
          <th className='w-40'>ESTADO</th>
          <th className='w-36'>PROGRESO</th>
          <th className='w-56'>TIPO</th>
        </tr>
      </thead>
      <tbody>
        <RecourseTableRow />
        <RecourseTableRow />
        <RecourseTableRow />
        <RecourseTableRow />
        
      </tbody>
    </table>
  )
}

export default RecourseTable