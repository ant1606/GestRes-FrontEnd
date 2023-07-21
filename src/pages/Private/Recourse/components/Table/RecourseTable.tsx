import RecourseTableRow from '../../Molecules/Recourse/RecourseTableRow';
import useRecourse from '../../context/RecourseContext.bak.js';

const RecourseTable = () => {
  const { recourses } = useRecourse();

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase ">
          <th className="w-48">ACCIONES</th>
          <th>NOMBRE</th>
          <th className="w-40">ESTADO</th>
          <th className="w-36">PROGRESO</th>
          <th className="w-56">TIPO</th>
        </tr>
      </thead>
      <tbody>
        {recourses?.map((recourse) => (
          <RecourseTableRow key={recourse.identificador} recourse={recourse} />
        ))}
      </tbody>
    </table>
  );
};

export default RecourseTable;
