import React from 'react';

import Row from './Row.js';
import { useRecourse } from '@/pages/Private/Recourse/context/recourse.context.js';

export const Table: React.FC = () => {
  const { recourseActive } = useRecourse();

  return (
    <table className="table-auto w-full mt-8">
      <thead>
        <tr className="text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase ">
          <th className="w-36 ">ACCIONES</th>
          <th className="w-32 ">FECHA</th>
          <th className="w-36 ">AVANCE</th>
          <th className="w-36 ">PENDIENTE</th>
          <th className="">COMENTARIO</th>
        </tr>
      </thead>
      <tbody>
        {recourseActive?.progress.map((progress: Progress, i: number) => (
          <Row
            key={i}
            isLastProgress={i + 1 === (recourseActive?.progress?.length ?? 0)}
            progress={progress}
          />
        ))}

        {/* {recourseActive &&
          recourseActive?.progress.map((progress, i) => {
            if (i + 1 === recourseActive?.progress.length) {
              return <Row key={i} last={true} progress={progress} />;
            } else {
              return <Row key={i} progress={progress} />;
            }
          })} */}
      </tbody>
    </table>
  );
};

export default Table;
