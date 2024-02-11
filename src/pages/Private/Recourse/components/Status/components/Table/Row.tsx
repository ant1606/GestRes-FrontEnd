import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { changeColorTitleBar, isLoading } from '#/redux/slice/uiSlice';
import { destroyStatus, getStatusPerRecourse } from '#/services/status.services';
import { toastNotifications } from '#/utilities/notificationsSwal';
import React from 'react';
import { useStatus } from '../../context/status.context';
import { useRecourse } from '#/pages/Private/Recourse/context/recourse.context';
import { type RootState } from '#/redux/store';
import { getRecourse } from '#/services/recourse.services';
import { IconContext } from 'react-icons';
import { FaTrashAlt } from 'react-icons/fa';
import { type StatusErrorResponse } from '../../index.types';
import { type RecourseSuccessResponse } from '#/pages/Private/Recourse/index.types';

interface Props {
  isLastStatus: boolean;
  status: Status;
}
const Row: React.FC<Props> = ({ isLastStatus, status }) => {
  const { recourseActive, selectedRecourse } = useRecourse();
  const { addValidationError, setStatuses } = useStatus();
  const { settingsStatus } = useAppSelector((state: RootState) => state.settings);
  const dispatch = useAppDispatch();
  // TOOD ver como hacer de esto una funcion global o util para obtener el estilo
  const styleStatus = settingsStatus.find((val) => val.value === status.statusName)?.value2;

  const handleClickDeleteWrapper = (status: Status): void => {
    handleClickDelete(status);
  };

  const handleClickDelete = async (status: Status): Promise<void> => {
    try {
      const result = await toastNotifications().modalDeleteConfirm('');
      if (!result) return;

      dispatch(isLoading(true));
      const response = await destroyStatus(status);

      if (response.status === 'error') {
        const responseError = response as StatusErrorResponse;
        // Errores de validación de campos por parte del backend
        Object.entries(responseError.details).forEach(([key, value]) => {
          addValidationError({ [key]: value });
        });

        // Mensaje de error general por parte del backend
        if (responseError.message !== '') {
          throw new Error(responseError.message);
        }
      } else {
        toastNotifications().toastSuccesCustomize(`Se elimino el registro`);

        const statusData = await getStatusPerRecourse(recourseActive?.id, 1);
        setStatuses(statusData);
        const recourseRefreshed = (await getRecourse(recourseActive.id)) as RecourseSuccessResponse;
        selectedRecourse(recourseRefreshed.data);

        if (!Array.isArray(recourseRefreshed.data)) {
          const recourse = recourseRefreshed.data;
          const styleStatus = settingsStatus.find(
            (val) => val.value === recourse.currentStatusName
          )?.value2;
          dispatch(changeColorTitleBar(styleStatus === undefined ? null : styleStatus));
        }
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };
  return (
    <tr className="h-12">
      <td className="w-36">
        <div className="flex justify-center">
          {isLastStatus && (
            <>
              <button
                className="w-8 h-8 flex justify-center items-center bg-red-600 rounded-lg cursor-pointer"
                onClick={() => {
                  handleClickDeleteWrapper(status);
                }}>
                <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                  <FaTrashAlt />
                </IconContext.Provider>
              </button>
            </>
          )}
        </div>
      </td>

      <td className="w-32  text-center">{status?.date}</td>

      <td className="w-44 ">
        <div className="flex justify-center">
          <div
            className={`
              ${styleStatus === undefined ? 'bg-gray-900' : styleStatus.split(' ')[0]}
              flex justify-center items-center w-38 px-4 py-1 rounded-2xl`}>
            <span
              className={`
                ${styleStatus === undefined ? 'text-white' : styleStatus.split(' ')[1]}
                text-sm font-bold  uppercase`}>
              {status?.statusName}
            </span>
          </div>
        </div>
      </td>

      <td className="">{status?.comment}</td>
    </tr>
  );
};

export default Row;
