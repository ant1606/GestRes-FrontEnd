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

import {useNavigate, Navigate} from "react-router-dom";
import RegisterUser from "../Components/Pages/RegisterUser.jsx";
import NotificationVerifyEmail from "../Components/Pages/NotificationVerifyEmail.jsx";

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
        //TODO Evaluar esta parte ya que no puedo acceder a register si esta activo
        // navigate("/login");
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
  //TODO Agregar un parametro para evaluar cuando el usuario a verificado su email, si fue asi, recien se le dará acceso a la aplicación
  return (
     <>
        <Routes>
            <Route path="/register" element={<RegisterUser/>}></Route>
            <Route path="/notifyVerifyEmail" element={<NotificationVerifyEmail/>}></Route>
            {!securityUserIsLogged ?
                (
                    <Route path="/login" element={<Login/>}></Route>
                ) :
                (
                    ///Pasar la ruta notifyVerifyEmail a un estado para acceder a la aplicación

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

        </Routes>


     </>
  )
}

export default AppRouter