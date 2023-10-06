import React from 'react';

const PanelCountStatusView: React.FC = () => {
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
            <tr className="hover:bg-slate-100 hover:cursor-pointer">
              <td className="w-40 h-11 px-2">
                <div className=" bg-gray-900 flex justify-center items-center w-38 px-4 py-1 rounded-2xl">
                  <span className="text-gray-50 text-sm font-bold  uppercase">REGISTRADO</span>
                </div>
              </td>
              <td className="text-center text-xl font-bold">50</td>
            </tr>
            <tr className="hover:bg-slate-100 hover:cursor-pointer">
              <td className="w-40 h-11 px-2">
                <div className=" bg-yellow-400 flex justify-center items-center w-38 px-4 py-1 rounded-2xl">
                  <span className="text-gray-900 text-sm font-bold  uppercase">POR EMPEZAR</span>
                </div>
              </td>
              <td className="text-center text-xl font-bold">2</td>
            </tr>
            <tr className="hover:bg-slate-100 hover:cursor-pointer">
              <td className="w-40 h-11 px-2">
                <div className=" bg-blue-500 flex justify-center items-center w-38 px-4 py-1 rounded-2xl">
                  <span className="text-gray-50 text-sm font-bold  uppercase">EN PROCESO</span>
                </div>
              </td>
              <td className="text-center text-xl font-bold">2</td>
            </tr>
            <tr className="hover:bg-slate-100 hover:cursor-pointer">
              <td className="w-40 h-11 px-2">
                <div className=" bg-green-800 flex justify-center items-center w-38 px-4 py-1 rounded-2xl">
                  <span className="text-gray-50 text-sm font-bold  uppercase">CULMINADO</span>
                </div>
              </td>
              <td className="text-center text-xl font-bold">3</td>
            </tr>
            <tr className="hover:bg-slate-100 hover:cursor-pointer">
              <td className="w-40 h-11 px-2">
                <div className=" bg-red-700 flex justify-center items-center w-38 px-4 py-1 rounded-2xl">
                  <span className="text-gray-50 text-sm font-bold  uppercase">DESCARTADO</span>
                </div>
              </td>
              <td className="text-center text-xl font-bold">10</td>
            </tr>
            <tr className="hover:bg-slate-100 hover:cursor-pointer">
              <td className="w-40 h-11 px-2">
                <div className=" bg-gray-300 flex justify-center items-center w-38 px-4 py-1 rounded-2xl">
                  <span className="text-gray-900 text-sm font-bold  uppercase">DESFASADO</span>
                </div>
              </td>
              <td className="text-center text-xl font-bold">20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PanelCountStatusView;
