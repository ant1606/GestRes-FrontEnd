import React from 'react';

import Row from './Row.js';
// import { useRecourse } from '@/pages/Private/Recourse/context/recourse.context.js';
import { useStatus } from '../../context/status.context.js';

export const Table: React.FC = () => {
  const { statuses } = useStatus();

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
        {statuses.map((status: Status, i: number) => (
          <Row key={i} isLastStatus={status.isLastRecord} status={status} />
        ))}
      </tbody>
    </table>
  );
};
// isLastStatus={i + 1 === (recourseActive?.status?.length ?? 0)}
