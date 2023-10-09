/* eslint-disable prettier/prettier */
import React from 'react';
import { type settingsDashboard } from './index.type';

interface Props {
  statusList: settingsDashboard[];
}
const PanelCountStatusView: React.FC<Props> = ({ statusList }) => {
  return (
    <div className="flex flex-col shadow-2xl rounded-2xl col-span-2">
      <div className="bg-gray-900 text-gray-50 rounded-t-2xl py-1  text-3xl font-bold uppercase text-center">
        resumen estado
      </div>
      <div className="py-4 px-4">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-gray-600 border-b-gray-400 text-lg border-b-2 font-bold text-uppercase ">
              <th className="w-40">ESTADO</th>
              <th>CANTIDAD</th>
            </tr>
          </thead>
          <tbody>
            {statusList.map((status) => (
              <tr key={status.key} className="hover:bg-slate-100 hover:cursor-pointer">
                <td className="w-40 h-11 px-2">
                  <div
                    className={`${status.value2.split(' ')[0]
                      } flex justify-center items-center w-38 px-4 py-1 rounded-2xl`}>
                    <span className={`${status.value2.split(' ')[1]} text-sm font-bold  uppercase`}>
                      {status.value}
                    </span>
                  </div>
                </td>
                <td className="text-center text-xl font-bold">{status.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PanelCountStatusView;