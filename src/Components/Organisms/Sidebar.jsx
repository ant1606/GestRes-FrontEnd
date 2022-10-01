import React, { useContext, useState } from 'react'
import ItemSideBar from '../Molecules/ItemSideBar'
import TitleSideBar from '../Molecules/TitleSideBar'
import UserInfo from '../Molecules/UserInfo'
import SideBarContext from '../../Context/SideBarContext'
import TitleContext from '../../Context/TitleContext'
import { NavLink } from 'react-router-dom'
import Titlebar from './Titlebar'

const menus = [
  {title: "Dashboard", icon:"dashboard.svg", link: true, path: "/dashboard"},
  {title: "Mantenimiento", icon:"", link: false, path: ""},
  {title: "Videos Youtube", icon:"youtube.svg", link: true, path: "/canales"},
  {title: "Recursos Educativos", icon:"graduate.svg", link: true, path: "/recursos"},
  {title: "Etiquetas", icon:"tag.svg", link: true, path: "/etiquetas"},
];

//Uso del context 
//https://mindsers.blog/post/updating-react-context-from-consumer/

const Sidebar = ({children}) => {
  
  const [open, setToggle] = useState(true);
  const [title, setTitle] = useState();

  function toggle() {
    setToggle(!open);
  }

  function changeTitle(value){
    setTitle(value);
  }

  return (
    <>
      <SideBarContext.Provider value={{open, toggle}}>
        <div className={`${ open ? "w-80" : "w-18"} 
          h-screen flex flex-col bg-gray-800 text-white 
          duration-300 ease-in-out`}>
        
          <TitleSideBar></TitleSideBar>
          <UserInfo></UserInfo>
          <hr className='mx-4 p-4 border-gray-500 border-t-2'/>
          {
            menus.map( (menu, index) => (
              
                <ItemSideBar 
                  key={index} 
                  title ={menu.title} 
                  icon={menu.icon} 
                  link={menu.link}
                  path={menu.path}
                ></ItemSideBar>
            ))
          }
        </div>
      </SideBarContext.Provider>

      <TitleContext.Provider value={{title, changeTitle}}>
        <main className='flex flex-col w-full'>
          <Titlebar></Titlebar>    
          {children}
        </main>
      </TitleContext.Provider>
    </>
  )
}

export default Sidebar