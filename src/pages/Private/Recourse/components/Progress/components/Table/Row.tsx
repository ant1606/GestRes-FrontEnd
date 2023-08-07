import React from 'react';
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';
import { toastNotifications } from '@/utilities/notificationsSwal';
import { useRecourse } from '@/pages/Private/Recourse/context/recourse.context';
import { useAppDispatch } from '@/hooks/redux';
import { isLoading } from '@/redux/slice/uiSlice';
import { destroyProgress, getProgressPerRecourse } from '@/services/progress.services';
import { useProgress } from '../../context/progress.context';

interface Props {
  isLastProgress: boolean;
  progress: Progress;
}

const Row: React.FC<Props> = ({ isLastProgress, progress }) => {
  const { setProgressesPerRecourse, recourseActive } = useRecourse();
  const dispatch = useAppDispatch();
  const { addValidationError } = useProgress();
  const handleClickDeleteWrapper = (progress: Progress): void => {
    handleClickDelete(progress);
  };

  const handleClickDelete = async (progress: Progress): Promise<void> => {
    try {
      const result = await toastNotifications().modalDeleteConfirm('');
      if (!result) return;

      dispatch(isLoading(true));
      const response = await destroyProgress(progress);
      if ('data' in response) {
        toastNotifications().toastSuccesCustomize(`Se elimino el registro`);

        const progressData = await getProgressPerRecourse(recourseActive?.id);
        setProgressesPerRecourse(progressData);
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
