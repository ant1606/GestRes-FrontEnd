import React from 'react';
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';
import { toastNotifications } from '@/utilities/notificationsSwal';
import { useRecourse } from '@/pages/Private/Recourse/context/recourse.context';
import { useAppDispatch } from '@/hooks/redux';
import { isLoading } from '@/redux/slice/uiSlice';
import { destroyProgress, getProgressPerRecourse } from '@/services/progress.services';
import { useProgress } from '../../context/progress.context';
import { GLOBAL_STATUS_RECOURSE } from '@/config/globalConstantes';
import { getRecourse } from '@/services/recourse.services';

interface Props {
  isLastProgress: boolean;
  progress: Progress;
}

const Row: React.FC<Props> = ({ isLastProgress, progress }) => {
  const { selectedRecourse, recourseActive } = useRecourse();
  const dispatch = useAppDispatch();
  const { addValidationError, setProgresses } = useProgress();
  const handleClickDeleteWrapper = (progress: Progress): void => {
    handleClickDelete(progress);
  };

  const handleClickDelete = async (progress: Progress): Promise<void> => {
    try {
      const lastStatusName = recourseActive.status.statusName as string;

      if (lastStatusName !== GLOBAL_STATUS_RECOURSE.EN_PROCESO) {
        toastNotifications().notificationError(
          `Sólo pueden eliminarse los registros de progreso del recurso cuando se encuentre en estado EN PROCESO`
        );
        return;
      }

      const result = await toastNotifications().modalDeleteConfirm('');
      if (!result) return;

      dispatch(isLoading(true));
      const response = await destroyProgress(progress);
      if ('data' in response) {
        toastNotifications().toastSuccesCustomize(`Se elimino el registro`);

        const progressData = await getProgressPerRecourse(recourseActive?.id, 1);
        setProgresses(progressData);
        const recourseRefreshed = await getRecourse(recourseActive.id);
        selectedRecourse(recourseRefreshed.data);
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
      console.log(error);
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };
  return (
    <tr className="h-12">
      <td className="w-36">
        <div className="flex justify-center">
          {isLastProgress && (
            <>
              <button
                className="w-8 h-8 flex justify-center items-center bg-red-600 rounded-lg cursor-pointer"
                onClick={() => {
                  handleClickDeleteWrapper(progress);
                }}>
                <Icon path={mdiTrashCan} title="Down" size={1} color="white" />
              </button>
            </>
          )}
        </div>
      </td>

      <td className="w-32  text-center">{progress?.date}</td>

      <td className="w-36 text-center">{progress?.done}</td>

      <td className="w-36 text-center">{progress?.pending}</td>

      <td className="">{progress?.comment}</td>
    </tr>
  );
};

export default Row;
