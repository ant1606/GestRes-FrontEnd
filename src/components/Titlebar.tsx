import React from 'react';
import { BiSolidExit } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { userIsLogout } from '#/redux/slice/authenticationSlice';
import { isLoading } from '#/redux/slice/uiSlice';
import { loggoutUser } from '#/services';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { useNavigate } from 'react-router-dom';
import { deletePersistenDataUser } from '#/utilities/authenticationManagement';
import { type RootState } from '#/redux/store';

const Titlebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { titleBarContent, titleBarColor, collapseSidebar } = useAppSelector(
    (state: RootState) => state.ui
  );

  const handleExitAppClick = async (): Promise<void> => {
    try {
      dispatch(isLoading(true));
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

  const maxWidthTitleBarText = collapseSidebar ? `max-w-[85vw] delay-100` : `max-w-[70vw] delay-0`;

  return (
    <div
      className={` 
      ${titleBarColor === null ? '' : titleBarColor} text-2xl font-semibold 
      h-14 px-6 py-3 shadow-lg flex justify-between items-center`}>
      <p className={`truncate transition-all ease-in-out  ${maxWidthTitleBarText} `}>
        {titleBarContent}
      </p>
      <div
        onClick={handleClickWrapper}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleClickWrapper();
          }
        }}>
        <IconContext.Provider value={{ size: '1.5em' }}>
          <BiSolidExit />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Titlebar;