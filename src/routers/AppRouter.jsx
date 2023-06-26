import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import SideBar from '../Components/Organisms/Sidebar'
import Dashboard from '../Components/Pages/Dashboard'
import Canales from '../Components/Pages/Canales'
import Titlebar from '../Components/Organisms/Titlebar'

import RecourseRouter from "./RecourseRouter.jsx";
import TagRouter from "./TagRouter.jsx";
import useSettings from "../Context/SettingsContext.jsx";
import LoginScreen from "../Components/Pages/Authentication/LoginScreen.jsx";
import { useSecurity } from "../Context/SecurityContext.jsx";
import { tokenExpired } from "../helpers/authenticationManagement.js";

import { useNavigate, Navigate } from "react-router-dom";
import RegisterUserScreen from "../Components/Pages/Authentication/RegisterUserScreen.jsx";
import ResendLinkVerifyEmailScreen from "../Components/Pages/Authentication/ResendLinkVerifyEmailScreen.jsx";
import VerifyEmailScreen from "../Components/Pages/Authentication/VerifyEmailScreen.jsx";
import PasswordForgetScreen from "../Components/Pages/Authentication/PasswordForgetScreen.jsx";
import PasswordResetScreen from "../Components/Pages/Authentication/PasswordResetScreen.jsx";

const AppRouter = () => {
  // TODO Agrupar TitleContext y  en SettingsContext
  const { loadSettings } = useSettings();
  const { securityUserIsLogged, checkRememberToken, securityUser } = useSecurity();
  const navigate = useNavigate();
  const { setUserIsLogged } = useSecurity();

  useEffect(() => {
    initApp();

  }, []);

  const initApp = async () => {
    await loadSettings();

    if (tokenExpired()) { //Token bearer
      if (!checkRememberToken()) {
        //TODO Evaluar esta parte ya que no puedo acceder a register  ni verifyEmail si esta activo
        // navigate("/login");
      }
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      // console.log(user);
      setUserIsLogged(user);
      // console.log(user.is_verified);
      //TODO Pasar como parametro la ultima pagina visitada del usuario, por el momento se esta colocando el dashboard
      !user.is_verified ? navigate("/notifyVerifyEmail") : navigate("/dashboard");

    }
  }

  /**
   * http://172.18.0.3:5173/verifyEmail/11/e65c022deb4ff7b5964476772ed8b401688d8938
   * Ruta de verificacion de email, primero esta el id, luego el hash que es el correo
   */
  // TODO Hacer que el titlebar se mantenga posicionado en la parte superior
  //TODO Hacer que solo el contenido principal pueda hacer scroll y no toda la pantalla
  //TODO COlocar la ruta por defecto que apunte a "/"
  //TODO Colocar la ruta no existente path="*" element={<>NOt Found</>}
  //TODO Separar las rutas entre Rutas Privadas y RUtas Publicas
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterUserScreen />}></Route>
        <Route path="/verifyEmail/:id/:hash" element={<VerifyEmailScreen />}></Route>
        <Route path="/forget-password" element={<PasswordForgetScreen />}></Route>
        <Route path="/reset-password" element={<PasswordResetScreen />}></Route>
      </Routes>
      {!securityUserIsLogged ?
        (
          <Routes>
            <Route path="/login" element={<LoginScreen />}></Route>
          </Routes>
        ) :
        !securityUser.is_verified ?
          (
            <Routes>
              <Route path="/notifyVerifyEmail" element={<ResendLinkVerifyEmailScreen />}></Route>
            </Routes>
          ) :
          (
            <>
              <div className='flex'>
                <SideBar />

                <main className='flex flex-col w-full'>
                  <Titlebar />
                  <div className='container h-full pt-4 px-6'>

                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/canales" element={<Canales />} />
                      <Route path="/" element={<Dashboard />} />
                    </Routes>

                    <TagRouter />
                    <RecourseRouter />

                  </div>
                </main>
              </div>
            </>
          )
      }
    </>
  )
}

export default AppRouter