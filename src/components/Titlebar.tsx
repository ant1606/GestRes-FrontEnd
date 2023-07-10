import React from 'react';
import Icon from '@mdi/react';
import { mdiExitToApp } from '@mdi/js';
import { useAppDispatch } from '@/hooks/redux';
import { userIsLogout } from '@/redux/slice/authenticationSlice';
import Cookies from 'js-cookie';
import { isLoading } from '@/redux/slice/uiSlice';
import { loggoutUser } from '@/services';
import { toastNotifications } from '@/utilities/notificationsSwal';
import { useNavigate } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
// import { useSecurity } from '../../Context/SecurityContext.jsx';

const Titlebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleExitAppClick = async (): Promise<void> => {
    // TODO ELiminar el LocalStorage de usuario y el bearerToken
    try {
      dispatch(isLoading(true));
      console.log('haciendo el logout');
      const response = await loggoutUser();
      console.log(response);
      if ('data' in response) {
        Cookies.remove('bearerToken');
        localStorage.clear();
        dispatch(userIsLogout());
        toastNotifications().toastSuccesCustomize(response.data.message);
        navigate('/login', { replace: true });
      } else if ('error' in response) {
        const errorsDetail = response.error?.detail;
        if ('apiResponse' in errorsDetail) {
          if (errorsDetail.apiResponse !== null) throw new Error(errorsDetail.apiResponse);
        }
      }
    } catch (error) {
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  const handleClickWrapper = (): void => {
    handleExitAppClick();
  };
  // TODO Colocar el titulo por cada página de la aplicación en la barra de título

  return (
    <div className="text-2xl font-semibold h-14 px-6 py-3 shadow-lg flex justify-between items-center">
      {/* <p>{title}</p> */}
      <p>Colocar Titulo</p>
      <div
        onClick={handleClickWrapper}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleClickWrapper();
          }
        }}>
        <Icon path={mdiExitToApp} size={1.5} className="cursor-pointer hover:text-blue-400" />
      </div>
    </div>
  );
};

export default Titlebar;
