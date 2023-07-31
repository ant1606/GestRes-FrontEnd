import React from 'react';

import Row from './Row.js';
import { useRecourse } from '@/pages/Private/Recourse/context/recourse.context.js';

export const Table: React.FC = () => {
  const { recourseActive } = useRecourse();

  return (
    <table className="table-auto w-full mt-8">
      <thead>
        <tr className="text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase">
          <th className="w-36">ACCIONES</th>
          <th className="w-32">FECHA</th>
          <th className="w-44">ESTADO</th>
          <th className="">COMENTARIO</th>
        </tr>
      </thead>
      <tbody>
        {recourseActive?.status.map((status: Status, i: number) => (
          <Row
            key={i}
            isLastStatus={i + 1 === (recourseActive?.status?.length ?? 0)}
            status={status}
          />
        ))}
      </tbody>
    </table>
  );
};
