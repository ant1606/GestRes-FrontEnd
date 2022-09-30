import React, { useContext, useState } from 'react'
import ItemSideBar from '../Molecules/ItemSideBar'
import TitleSideBar from '../Molecules/TitleSideBar'
import UserInfo from '../Molecules/UserInfo'
import SideBarContext from '../../Context/SideBarContext'

const menus = [
  {title: "Dashboard", icon:"dashboard.svg", link: true},
  {title: "Mantenimiento", icon:"", link: false},
  {title: "Videos Youtube", icon:"youtube.svg", link: true},
  {title: "Recursos Educativos", icon:"graduate.svg", link: true},
  {title: "Etiquetas", icon:"tag.svg", link: true},
];

//Uso del context 
//https://mindsers.blog/post/updating-react-context-from-consumer/

const Sidebar = () => {
  
  const [open, setToggle] = useState(true);

  function toggle() {
    setToggle(!open);
  }

  return (
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
            ></ItemSideBar>
          ))
        }

      </div>
    </SideBarContext.Provider>
    
  )
}

export default Sidebar