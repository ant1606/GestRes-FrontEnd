import { useAppSelector } from '@/hooks/redux';
import { type RootState } from '@/redux/store';
import React from 'react';
import { NavLink } from 'react-router-dom';
// import SideBarContext from '../../Context/SideBarContext';
interface Props {
  title: string;
  icon: string;
  link: boolean;
  path: string;
}
const ItemSideBar: React.FC<Props> = ({ title, icon, link, path }) => {
  const { collapseSidebar } = useAppSelector((state: RootState) => state.ui);

  return (
    <>
      {
        // TODO Ver como podemos concatenar las clases del navLink cuando esta activo para no repetir clases
        link ? (
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive
                ? 'bg-blue-600 flex items-center rounded-lg mx-4 mb-4 py-2 pl-2 gap-3 text-base font-bold hover:bg-blue-600 text-white h-12 cursor-pointer'
                : 'flex items-center rounded-lg mx-4 mb-4 py-2 pl-2 gap-3 text-base font-bold hover:bg-blue-600 text-white h-12 cursor-pointer'
            }>
            {/* <div className='flex items-center rounded-lg mx-4 mb-4 py-2 pl-2 gap-3 
            text-base font-bold hover:bg-blue-600 text-white h-12 cursor-pointer'> */}
            <img className="w-6 h-6" src={icon} alt="icon" />
            <p className={`${collapseSidebar ? 'scale-0' : ''} origin-left duration-300 truncate`}>
              {title}
            </p>
            {/* </div> */}
          </NavLink>
        ) : (
          <div className="p-4">
            <p className={`${collapseSidebar ? 'scale-0' : ''}  origin-left duration-300 truncate`}>
              {title}
            </p>
          </div>
        )
      }
    </>
  );
};

export default ItemSideBar;
