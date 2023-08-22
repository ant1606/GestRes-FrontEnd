import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeColorTitleBar, isLoading } from '@/redux/slice/uiSlice';
import { destroyStatus, getStatusPerRecourse } from '@/services/status.services';
import { toastNotifications } from '@/utilities/notificationsSwal';
import { mdiTrashCan } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useStatus } from '../../context/status.context';
import { useRecourse } from '@/pages/Private/Recourse/context/recourse.context';
import { type RootState } from '@/redux/store';
import { getRecourse } from '@/services/recourse.services';

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
      if ('data' in response) {
        toastNotifications().toastSuccesCustomize(`Se elimino el registro`);

        const statusData = await getStatusPerRecourse(recourseActive?.id, 1);
        setStatuses(statusData);
        const recourseRefreshed = await getRecourse(recourseActive.id);
        selectedRecourse(recourseRefreshed.data);

        const styleStatus = settingsStatus.find(
          (val) => val.value === recourseRefreshed.data.currentStatusName
        )?.value2;
        dispatch(changeColorTitleBar(styleStatus === undefined ? null : styleStatus));
        // TODO Change page 1 paginator
      } else if ('error' in response) {
        const errorsDetail = response.error?.detail;
        Object.keys(errorsDetail).forEach((key) => {
          if (key !== 'apiResponseMessageError') {
            addValidationError({ [key]: errorsDetail[key] });
          }
        });

        if ('apiResponseMessageError' in errorsDetail) {
          if (errorsDetail.apiResponseMessageError !== null)
            throw new Error(errorsDetail.apiResponseMessageError);
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
                <Icon path={mdiTrashCan} title="Down" size={1} color="white" />
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
