import React from 'react';
import Icon from '@mdi/react';
import { mdiExitToApp } from '@mdi/js';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { userIsLogout } from '@/redux/slice/authenticationSlice';
import { isLoading } from '@/redux/slice/uiSlice';
import { loggoutUser } from '@/services';
import { toastNotifications } from '@/utilities/notificationsSwal';
import { useNavigate } from 'react-router-dom';
import { deletePersistenDataUser } from '@/utilities/authenticationManagement';
import { type RootState } from '@/redux/store';

// import { useNavigate } from 'react-router-dom';
// import { useSecurity } from '../../Context/SecurityContext.jsx';

const Titlebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { titleBarContent, titleBarColor } = useAppSelector((state: RootState) => state.ui);

  const handleExitAppClick = async (): Promise<void> => {
    try {
      dispatch(isLoading(true));
      // TODO Verificar funcionamiento de logout
      const response = await loggoutUser();

      if ('data' in response) {
        deletePersistenDataUser();
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

  return (
    <div
      className={` 
      ${titleBarColor === null ? '' : titleBarColor} text-2xl font-semibold 
      h-14 px-6 py-3 shadow-lg flex justify-between items-center`}>
      <p>{titleBarContent}</p>
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
