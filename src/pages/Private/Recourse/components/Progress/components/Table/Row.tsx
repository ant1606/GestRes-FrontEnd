import React from 'react';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { useRecourse } from '#/pages/Private/Recourse/context/recourse.context';
import { useAppDispatch } from '#/hooks/redux';
import { isLoading } from '#/redux/slice/uiSlice';
import { destroyProgress, getProgressPerRecourse } from '#/services/progress.services';
import { useProgress } from '../../context/progress.context';
import { GLOBAL_STATUS_RECOURSE } from '#/config/globalConstantes';
import { getRecourse } from '#/services/recourse.services';
import { FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { type ProgressErrorResponse } from '../../indext.types';
import { type RecourseSuccessResponse } from '#/pages/Private/Recourse/index.types';
import { useFetch } from '#/hooks/useFetch';

interface Props {
  isLastProgress: boolean;
  progress: Progress;
}

const Row: React.FC<Props> = ({ isLastProgress, progress }) => {
  const { selectedRecourse, recourseActive } = useRecourse();
  const dispatch = useAppDispatch();
  const { addValidationError, setProgresses } = useProgress();
  const { fetchWithSessionHandling } = useFetch();

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
      const response = await destroyProgress(progress, fetchWithSessionHandling);

      if (response.status === 'error') {
        const responseError = response as ProgressErrorResponse;
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

        const progressData = await getProgressPerRecourse(
          recourseActive?.id,
          fetchWithSessionHandling,
          1
        );
        setProgresses(progressData);
        const recourseRefreshed = (await getRecourse(
          recourseActive.id,
          fetchWithSessionHandling
        )) as RecourseSuccessResponse;
        selectedRecourse(recourseRefreshed.data);
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
                <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                  <FaTrashAlt />
                </IconContext.Provider>
              </button>
            </>
          )}
        </div>
      </td>

      <td className="w-32  text-center">{progress?.date}</td>

      <td className="w-36 text-center">{progress?.advanced}</td>

      <td className="w-36 text-center">{progress?.pending}</td>

      <td className="w-36 text-center">{progress?.done}</td>

      <td className="">{progress?.comment}</td>
    </tr>
  );
};

export default Row;
