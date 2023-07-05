import React from 'react';
import Icon from '@mdi/react';
import { mdiExitToApp } from '@mdi/js';
import { useAppDispatch } from '@/hooks/redux';
import { userIsLogout } from '@/redux/slice/authenticationSlice';

// import { useNavigate } from 'react-router-dom';
// import { useSecurity } from '../../Context/SecurityContext.jsx';

const Titlebar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleExitAppClick = (): void => {
    dispatch(userIsLogout());
  };
  // TODO Colocar el titulo por cada página de la aplicación en la barra de título

  return (
    <div className="text-2xl font-semibold h-14 px-6 py-3 shadow-lg flex justify-between items-center">
      {/* <p>{title}</p> */}
      <p>Colocar Titulo</p>
      <div
        onClick={handleExitAppClick}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleExitAppClick();
          }
        }}>
        <Icon path={mdiExitToApp} size={1.5} className="cursor-pointer hover:text-blue-400" />
      </div>
    </div>
  );
};

export default Titlebar;
