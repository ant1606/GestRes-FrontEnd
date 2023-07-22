import { useRecourse } from '../../context/recourse.context.js';
import Row from './Row.js';

export const Table: React.FC = () => {
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
        {recourses?.map((recourse: Recourse) => (
          <Row key={recourse.id} recourse={recourse} />
        ))}
      </tbody>
    </table>
  );
};
