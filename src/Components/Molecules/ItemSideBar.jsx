import React, { useContext } from 'react'
import SideBarContext from '../../Context/SideBarContext';

const ItemSideBar = ({title, icon, link}) => {
  const {open, toggle} = useContext(SideBarContext);

  return (
    <>
      {
        link ? (
          <div className='flex items-center rounded-lg mx-4 mb-4 py-2 pl-2 gap-3 
          text-base font-bold hover:bg-blue-600 text-white h-12 cursor-pointer'>
            <img className='w-6 h-6 ' src={`./src/assets/${icon}`} alt="icon" />
            <a href="#" className={`${!open && "scale-0"} origin-left duration-300 truncate`}>{title}</a>
          </div>
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