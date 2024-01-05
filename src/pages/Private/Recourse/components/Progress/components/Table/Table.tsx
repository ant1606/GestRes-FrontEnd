import React from 'react';

import Row from './Row.js';
import { useProgress } from '../../context/progress.context.js';

export const Table: React.FC = () => {
  const { progresses } = useProgress();

  return (
    <table className="table-auto w-full mt-8">
      <thead>
        <tr className="text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase ">
          <th className="w-36 ">ACCIONES</th>
          <th className="w-32 ">FECHA</th>
          <th className="w-36 ">AVANZADO HASTA</th>
          <th className="w-36 ">PENDIENTE</th>
          <th className="w-36 ">REALIZADO</th>
          <th className="">COMENTARIO</th>
        </tr>
      </thead>
      <tbody>
        {progresses.map((progress: Progress, i: number) => (
          <Row key={i} isLastProgress={progress.isLastRecord} progress={progress} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
