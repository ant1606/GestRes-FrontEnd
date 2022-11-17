import React, {useEffect} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import SideBar from '../Components/Organisms/Sidebar'
import Dashboard from '../Components/Pages/Dashboard'
import Canales from '../Components/Pages/Canales'
import Titlebar from '../Components/Organisms/Titlebar'

import RecourseRouter from "./RecourseRouter.jsx";
import TagRouter from "./TagRouter.jsx";
import useSettings from "../Context/SettingsContext.jsx";

const AppRouter = () => {
  // TODO Agrupar TitleContext y SideBarContext en SettingsContext
  const {loadSettings} = useSettings()

  useEffect(()=>{
    loadSettings();
  },[]);

  return (
      <BrowserRouter>
        <div className='flex'>
          <SideBar/>

          <main className='flex flex-col w-full'>
            <Titlebar />
            <div className='container h-full pt-4 px-6'>

              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/canales" element={<Canales />}/>
                <Route path="/" element={<Dashboard />} />
              </Routes>

              <TagRouter/>
              <RecourseRouter/>

            </div>
          </main>
        </div>
      </BrowserRouter>
  )
}

export default AppRouter