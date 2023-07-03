import React, { useContext } from 'react';

// import SideBarContext from '../../Context/SideBarContext';
import menus from '@/config/menus';
import UserInfo from './UserInfo';
import TitleSideBar from './TitleSideBar';
import ItemSideBar from './ItemSideBar';

const Sidebar: React.FC = () => {
  // const { open } = useContext(SideBarContext);

  // <div
  //     className={`${open ? 'w-80' : 'w-18'}
  //     h-screen bg-gray-800 text-white
  //     duration-300 ease-in-out sticky top-0 left-0`}></div>
  return (
    <div
      className={`w-80
      h-screen bg-gray-800 text-white 
      duration-300 ease-in-out sticky top-0 left-0`}>
      <TitleSideBar />
      <UserInfo />

      <hr className="mx-4 p-4 border-gray-500 border-t-2" />
      {menus.map((menu, index) => (
        <ItemSideBar
          key={index}
          title={menu.title}
          icon={menu.icon}
          link={menu.link}
          path={menu.path}
        />
      ))}
    </div>
  );
};

export default Sidebar;
