import React, { useRef } from 'react';
import ProgressView from './ProgressView';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useRecourse } from '../../context/recourse.context';
import ProgressForm from './components/Form/ProgressForm';
import { ProgressProvider } from './context/progress.context';
import { getProgressPerRecourse } from '@/services/progress.services';
import { GLOBAL_STATUS_RECOURSE } from '@/config/globalConstantes';
import { toastNotifications } from '@/utilities/notificationsSwal';

export const ProgressContainer: React.FC = () => {
  const { recourseActive, setProgressesPerRecourse } = useRecourse();
  const MySwal = withReactContent(Swal);
  const modalRef = useRef(MySwal);

  const handleClickNuevo = (): void => {
    const lastStatusName = recourseActive.status[recourseActive.status.length - 1]
      .statusName as string;
    if (lastStatusName !== GLOBAL_STATUS_RECOURSE.EN_PROCESO) {
      toastNotifications().notificationError(
        `Sólo puede registrarse el progreso del recurso cuando se encuentre en estado EN PROCESO`
      );
      return;
    }

    MySwal.fire({
      title: 'Registrar Progreso',
      html: (
        <ProgressProvider>
          <ProgressForm
            modalRef={modalRef.current}
            recourseParent={recourseActive}
            onFormSubmit={() => {
              handleFormSubmit();
            }}
          />
        </ProgressProvider>
      ),
      showConfirmButton: false,
      allowOutsideClick: false
    });
  };
  const handleFormSubmit = async (): Promise<void> => {
    modalRef.current?.close();
    const progressData = await getProgressPerRecourse(recourseActive?.id);
    setProgressesPerRecourse(progressData);
  };

  return <ProgressView handleClick={handleClickNuevo} />;
};
