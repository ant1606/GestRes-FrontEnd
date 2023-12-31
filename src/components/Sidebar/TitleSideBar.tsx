import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { toggleSidebar } from '#/redux/slice/uiSlice';
import { type RootState } from '#/redux/store';
import React from 'react';
// import SideBarContext from '../../Context/SideBarContext';

const TitleSideBar: React.FC = () => {
  const { collapseSidebar } = useAppSelector((state: RootState) => state.ui);
  const dispatch = useAppDispatch();
  const handleClick = (): void => {
    dispatch(toggleSidebar());
  };
  return (
    <div className="flex relative justify-center text-base uppercase leading-4 font-black items-center gap-4 bg-gray-900 p-4 h-14">
      <h2
        className={` 
        ${collapseSidebar ? 'scale-0 absolute ' : ''} origin-left duration-300 truncate`}>
        Gestor de Recursos
      </h2>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
        onClick={handleClick}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
        />
      </svg>
    </div>
  );
};

export default TitleSideBar;
