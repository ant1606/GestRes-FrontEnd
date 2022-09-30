import React, { useContext } from 'react'
import SideBarContext from '../../Context/SideBarContext';

const UserInfo = () => {
  const {open, toggle} = useContext(SideBarContext);
  return (
    <div className='flex items-center p-4 gap-2.5 text-sm uppercase font-black'>

        <img src="https://picsum.photos/40/40" alt="user picture" 
        className="rounded-xl"/>

        <div className="flex flex-col gap-2">
          <p  className={`${!open && "scale-0"} origin-left duration-300 truncate`}>riboer</p>
          <p  className={`${!open && "scale-0"} origin-left duration-300 truncate`}>admin</p>
        </div>
      </div>
  )
}

export default UserInfo