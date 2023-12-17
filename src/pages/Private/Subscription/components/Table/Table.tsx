import React from 'react';

import Row from './Row.js';
import { useYoutubeSubscription } from '../../context/subscription.context.js';

export const Table: React.FC = () => {
  const { youtubeSubscriptions } = useYoutubeSubscription();

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase ">
          <th className="w-48">ACCIONES</th>
          <th>-</th>
          <th>Canal</th>
          <th>Fecha Subscripción</th>
          {/* <th>Descripción</th> */}
          {/* <th>Fecha Registro</th> */}
        </tr>
      </thead>
      <tbody>
        {youtubeSubscriptions?.map((youtubeSubscription: YoutubeSubscription) => {
          console.log(youtubeSubscription.id);
          return <Row key={youtubeSubscription.id} youtubeSubscription={youtubeSubscription} />;
        })}
      </tbody>
    </table>
  );
};
