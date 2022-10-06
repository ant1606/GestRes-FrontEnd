import React, { useContext } from 'react'
import ItemSideBar from '../Molecules/ItemSideBar'
import TitleSideBar from '../Molecules/TitleSideBar'
import UserInfo from '../Molecules/UserInfo'
import SideBarContext from '../../Context/SideBarContext'
import Titlebar from './Titlebar'
import menus from '../../data/menus'

const Sidebar = ({children}) => {

  const {open} = useContext(SideBarContext);

  return (
    <>
      <div className={`${ open ? "w-80" : "w-18"} 
        h-screen flex flex-col bg-gray-800 text-white 
        duration-300 ease-in-out`}>
      
        <TitleSideBar />
        <UserInfo />

        <hr className='mx-4 p-4 border-gray-500 border-t-2'/>
        {
          menus.map( (menu, index) => (
            
              <ItemSideBar 
                key={index} 
                title ={menu.title} 
                icon={menu.icon} 
                link={menu.link}
                path={menu.path}
              />
          ))
        }
      </div>

      <main className='flex flex-col w-full'>
        <Titlebar />
        {children} 
      </main>
    </>
  )
}

export default Sidebar