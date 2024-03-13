import React from 'react';
import { IconContext } from 'react-icons';
import { FaEye } from 'react-icons/fa6';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { type Top5Recourse } from './index.type';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Prop {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  listRecourses: Top5Recourse[];
  isLoadingSearch: boolean;
}

const PanelRecoursesView: React.FC<Prop> = ({ handleChange, listRecourses, isLoadingSearch }) => {
  // TODO Parece que para poder vincular el boton del recurso con la pagina, tendré que cambiar la lógica en la pagina show de recourse
  // Ya que yo cargo los datos mostrados en la tabla y paso la informacion del recurso al formulario por medio del state y context

  // TODO Agregar loader a los paneles
  return (
    <div className="flex flex-col shadow-2xl rounded-2xl col-span-4 h-fit">
      <div className="flex justify-between items-end">
        <div className="bg-yellow-400 text-gray-900 rounded-tl-2xl py-1 px-9 text-3xl font-bold uppercase">
          por empezar
        </div>
        <div>
          <ToggleSwitch handleChange={handleChange} />
        </div>
        <div className="bg-blue-500 text-gray-50 rounded-tr-2xl py-1 px-9  text-3xl font-bold uppercase">
          en proceso
        </div>
      </div>
      <div className="">
        <ol className="py-4 px-4">
          {isLoadingSearch ? (
            <Skeleton count={5} height="2.25rem" className="mb-2" />
          ) : listRecourses.length === 0 ? (
            // TODO Dar estilos a este componente
            <p>No se encontraron resultados</p>
          ) : (
            listRecourses.map((recourse) => (
              <li key={recourse.id} className="flex">
                <div className="inline-block p-2">
                  <NavLink to={`/app/recourse/${recourse.id}`}>
                    <button className="w-8 h-8  flex justify-center items-center bg-blue-700 rounded-lg">
                      <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                        <FaEye />
                      </IconContext.Provider>
                    </button>
                  </NavLink>
                </div>
                <span className="p-2 text-lg leading-7 font-semibold truncate">
                  {recourse.name}
                </span>
              </li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
};

export default PanelRecoursesView;
