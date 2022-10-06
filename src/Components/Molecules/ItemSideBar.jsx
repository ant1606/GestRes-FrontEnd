import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import SideBarContext from '../../Context/SideBarContext';

const ItemSideBar = ({title, icon, link, path}) => {
  const {open } = useContext(SideBarContext);

  //  ({isActive }) => isActive ? "bg-blue-600" : undefined`}
  return (
    <>
      {
        //TODO Ver como podemos concatenar las clases del navLink cuando esta activo para no repetir clases
        link ? (
          <NavLink to={path}  className={({ isActive }) =>
          isActive ? "bg-blue-600 flex items-center rounded-lg mx-4 mb-4 py-2 pl-2 gap-3 text-base font-bold hover:bg-blue-600 text-white h-12 cursor-pointer" :
          "flex items-center rounded-lg mx-4 mb-4 py-2 pl-2 gap-3 text-base font-bold hover:bg-blue-600 text-white h-12 cursor-pointer"
        }
          >
            {/* <div className='flex items-center rounded-lg mx-4 mb-4 py-2 pl-2 gap-3 
            text-base font-bold hover:bg-blue-600 text-white h-12 cursor-pointer'> */}
              <img className='w-6 h-6 ' src={`./src/assets/${icon}`} alt="icon" />
              <p className={`${!open && "scale-0"} origin-left duration-300 truncate`}>{title}</p>
            {/* </div> */}
          </NavLink>
        ) : (
          <div className='p-4'>
            <p className={`${!open && "scale-0 "}  origin-left duration-300 truncate`}>{title}</p>
          </div>
        )
      }
    </>
  )
}

export default ItemSideBar