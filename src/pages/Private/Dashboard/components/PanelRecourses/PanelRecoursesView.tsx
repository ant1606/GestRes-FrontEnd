import React from 'react';
import { IconContext } from 'react-icons';
import { FaEye } from 'react-icons/fa6';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

const PanelRecoursesView: React.FC = () => {
  return (
    <div className="flex flex-col shadow-2xl rounded-2xl col-span-4">
      <div className="flex justify-between items-end">
        <div className="bg-yellow-400 text-gray-900 rounded-tl-2xl py-1 px-9 text-3xl font-bold uppercase">
          por empezar
        </div>
        <div>
          <ToggleSwitch />
        </div>
        <div className="bg-blue-500 text-gray-50 rounded-tr-2xl py-1 px-9  text-3xl font-bold uppercase">
          en proceso
        </div>
      </div>
      <div className="">
        <ol className="py-4 px-4">
          <li className="flex">
            <div className="inline-block p-2">
              <button className="w-8 h-8  flex justify-center items-center bg-blue-700 rounded-lg">
                <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                  <FaEye />
                </IconContext.Provider>
              </button>
            </div>
            <span className="p-2 text-lg leading-7 font-semibold truncate">
              Mi Recurso numero 1 de prueba hasta Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Facilis est ab consequatur doloremque amet id at dignissimos quasi,
              unde harum porro, dolores labore illum possimus et placeat eveniet illo quidem?
            </span>
          </li>
          <li className="flex">
            <div className="inline-block p-2">
              <button className="w-8 h-8  flex justify-center items-center bg-blue-700 rounded-lg">
                <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                  <FaEye />
                </IconContext.Provider>
              </button>
            </div>
            <span className="p-2 text-lg leading-7 font-semibold truncate">
              Mi Recurso numero 1 de prueba hasta Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Facilis est ab consequatur doloremque amet id at dignissimos quasi,
              unde harum porro, dolores labore illum possimus et placeat eveniet illo quidem?
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PanelRecoursesView;
/*
<NavLink to={`/app/recourse/${recourse.id}`}>
<button
  className="w-8 h-8  flex justify-center items-center bg-blue-700 rounded-lg"
  onClick={() => {
    handleClickShow(recourse);
  }}>
  <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
    <FaEye />
  </IconContext.Provider>
</button>
</NavLink>

*/
