import React, {useEffect, useState} from 'react'
import {Route, Routes} from 'react-router-dom';

import SideBar from '../Components/Organisms/Sidebar'
import Dashboard from '../Components/Pages/Dashboard'
import Canales from '../Components/Pages/Canales'
import Titlebar from '../Components/Organisms/Titlebar'

import RecourseRouter from "./RecourseRouter.jsx";
import TagRouter from "./TagRouter.jsx";
import useSettings from "../Context/SettingsContext.jsx";
import Login from "../Components/Pages/Login.jsx";
import useSecurity from "../Context/SecurityContext.jsx";
import {tokenExpired} from "../helpers/authenticationManagement.js";

import {useNavigate} from "react-router-dom";

const AppRouter = () => {
  // TODO Agrupar TitleContext y  en SettingsContext
  const { loadSettings } = useSettings();
  const {securityUserIsLogged, checkRememberToken } = useSecurity();
  const navigate = useNavigate();
  const {setUserIsLogged} = useSecurity();

  useEffect(()=>{
    initApp();
  },[]);

  const initApp = async() => {
    await loadSettings();

    if(tokenExpired()){ //Token bearer
      if(!checkRememberToken()){
        navigate("/login");
      }
    }else{
      const user = JSON.parse(localStorage.getItem('user'));
      setUserIsLogged(user);
      //TODO Pasar como parametro la ultima pagina visitada del usuario, por el momento se esta colocando el dashboard
      navigate("/dashboard");
    }
  }

  // TODO Hacer que el titlebar se mantenga posicionado en la parte superior
  //TODO Hacer que solo el contenido principal pueda hacer scroll y no toda la pantalla
  return (
     <>
        {!securityUserIsLogged ?
          (
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
     </>
  )
}

export default AppRouter