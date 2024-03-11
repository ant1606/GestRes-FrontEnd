import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TableBody: React.FC = () => {
  return (
    <tr>
      <td className="w-20 h-14">
        <div className="flex justify-around items-center px-3 py-2">
          <Skeleton
            containerClassName="flex justify-evenly flex-1"
            circle
            count={3}
            inline={true}
            width="2rem"
            height="2rem"
          />
        </div>
      </td>
      <td className="h-14 w-60 pr-5">
        <div className="flex">
          <Skeleton containerClassName="flex-1" />
        </div>
      </td>
      <td className="h-14 w-80 pr-5">
        <div className="text-center text-lg text-gray-900 font-semibold">
          <Skeleton />
        </div>
      </td>
      <td className="h-14 w-40 pr-5">
        <div className="text-center text-lg text-gray-900 font-semibold">
          <Skeleton />
        </div>
      </td>
      <td className="h-14 w-20 pr-5">
        <div className="text-center text-lg text-gray-900 font-semibold">
          <Skeleton />
        </div>
      </td>
    </tr>
  );
};

const TableSkeleton: React.FC = () => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase">
          <th className="w-20 pr-5">
            <Skeleton />
          </th>
          <th className="w-60 pr-5">
            <Skeleton />
          </th>
          <th className="w-80 pr-5">
            <Skeleton />
          </th>
          <th className="w-40 pr-5">
            <Skeleton />
          </th>
          <th className="w-20 pr-5">
            <Skeleton />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array(5)
          .fill(0)
          .map((x, i) => (
            <TableBody key={i} />
          ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
