import React, { useContext } from 'react'
import TitleContext from '../../Context/TitleContext';
import Icon from "@mdi/react";
import {mdiExitToApp} from "@mdi/js";

import {useNavigate} from "react-router-dom";
import {useSecurity} from "../../Context/SecurityContext.jsx";

const Titlebar = () => {
  const {title} = useContext(TitleContext);
  const {logoutUser} = useSecurity()
  const navigate = useNavigate();

  const handleExitAppClick = () => {
      logoutUser();
      // alert("cerrar sesion");
      navigate("/login");
      // alert("cerrar sesion");
  }

  return (
    <div className='text-2xl font-semibold h-14 px-6 py-3 shadow-lg flex justify-between items-center'>
        <p>{title}</p>
        <div>

            <Icon path={mdiExitToApp} size={1.5} onClick={handleExitAppClick} className="cursor-pointer hover:text-blue-400"/>
        </div>
    </div>
  )
}

export default Titlebar