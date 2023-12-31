import React from 'react';

import Row from './Row.js';
import { useWebPage } from '../../context/webPage.context.js';

export const Table: React.FC = () => {
  const { webPages } = useWebPage();

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase ">
          <th className="w-48">ACCIONES</th>
          <th>NOMBRE</th>
          <th>LINK</th>
          <th>DESCRIPCIÓN</th>
          <th># VISITAS</th>
        </tr>
      </thead>
      <tbody>
        {webPages?.map((webPage: WebPage) => (
          <Row key={webPage.id} webPage={webPage} />
        ))}
      </tbody>
    </table>
  );
};
