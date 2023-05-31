import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import SideBar from '../Components/Organisms/Sidebar'
import Dashboard from '../Components/Pages/Dashboard'
import Canales from '../Components/Pages/Canales'
import Titlebar from '../Components/Organisms/Titlebar'

import RecourseRouter from "./RecourseRouter.jsx";
import TagRouter from "./TagRouter.jsx";
import useSettings from "../Context/SettingsContext.jsx";
import Login from "../Components/Pages/Login.jsx";

const AppRouter = () => {
  // TODO Agrupar TitleContext y SideBarContext en SettingsContext
  const { loadSettings } = useSettings()
  //TODO Gestionar el logged del usuario para condicionar el render de las vistas
  const [logged, setLogged] = useState(false);

  useEffect(()=>{
    initApp();
  },[]);

  const initApp = async() => {
    await loadSettings();
  }

  // TODO Hacer que el titlebar se mantenga posicionado en la parte superior
  //TODO Hacer que solo el contenido principal pueda hacer scroll y no toda la pantalla
  return (
      <BrowserRouter>

        {!logged ? (
            <Routes>
              <Route path="/login" element={<Login/>}></Route>
            </Routes>
        ) :
            (
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
            )
        }

      </BrowserRouter>
  )
}

export default AppRouter