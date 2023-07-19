import React from 'react';

import Row from './Row.js';
import { useTag } from '../../context/tag.context.js';

export const Table: React.FC = () => {
  const { tags } = useTag();
  console.log(tags, 'desde table');
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase ">
          <th className="w-48">ACCIONES</th>
          <th>ETIQUETA</th>
        </tr>
      </thead>
      <tbody>
        {tags?.map((tag: Tag) => (
          <Row key={tag.id} tag={tag} />
        ))}
      </tbody>
    </table>
  );
};
