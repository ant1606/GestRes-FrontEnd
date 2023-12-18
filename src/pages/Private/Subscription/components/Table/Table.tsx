import React from 'react';

import Row from './Row.js';
import { useYoutubeSubscription } from '../../context/subscription.context.js';

export const Table: React.FC = () => {
  const { youtubeSubscriptions } = useYoutubeSubscription();

  return (
    <table className="table-auto w-full ">
      <thead>
        <tr className="text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase ">
          <th className="w-48">ACCIONES</th>
          <th className="w-30 text-center">Ir a Canal</th>
          <th className="min-w-full text-start">Canal</th>
          <th className="w-26">Fecha Subscripción</th>
          {/* <th>Descripción</th> */}
          {/* <th>Fecha Registro</th> */}
        </tr>
      </thead>
      <tbody>
        {youtubeSubscriptions?.map((youtubeSubscription: YoutubeSubscription) => (
          <Row key={youtubeSubscription.id} youtubeSubscription={youtubeSubscription} />
        ))}
      </tbody>
    </table>
  );
};
