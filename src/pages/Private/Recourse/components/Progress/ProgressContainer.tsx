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
import { BrowserRouter, useNavigate } from 'react-router-dom';

export const ProgressContainer: React.FC = () => {
  const { recourseActive, setProgressesPerRecourse } = useRecourse();
  const MySwal = withReactContent(Swal);
  const modalRef = useRef(MySwal);
  const navigate = useNavigate();

  const handleClickNuevo = (): void => {
    const lastStatusName = recourseActive.status[recourseActive.status.length - 1]
      .statusName as string;
    const lastPendingAmount = recourseActive.progress[recourseActive.progress.length - 1]
      .pending as number;
    if (lastPendingAmount === 0) {
      toastNotifications().notificationSuccess(`Usted culminó el recurso. ¡FELICIDADES!`);
      return;
    }
    if (lastStatusName !== GLOBAL_STATUS_RECOURSE.EN_PROCESO) {
      toastNotifications().notificationError(
        `Sólo puede registrarse el progreso del recurso cuando se encuentre en estado EN PROCESO`
      );
      return;
    }

    MySwal.fire({
      title: 'Registrar Progreso',
      html: (
        <BrowserRouter>
          <ProgressProvider>
            <ProgressForm
              modalRef={modalRef.current}
              recourseParent={recourseActive}
              onFormSubmit={(pending) => {
                handleFormSubmit(pending);
              }}
            />
          </ProgressProvider>
        </BrowserRouter>
      ),
      showConfirmButton: false,
      allowOutsideClick: false
    });
  };
  const handleFormSubmit = async (pendingAmount: number): Promise<void> => {
    // TODO Hacer que cuando se halla finalizado el recurso( el valor pendiente sea 0), pase a la pantalla principal de recursos
    if (pendingAmount === 0) {
      navigate('/app/recourse');
      const nameRecourse = recourseActive.name as string;
      toastNotifications().notificationSuccess(
        `Finalizó el recurso ${nameRecourse}, Felicidades`,
        () => {
          navigate('/app/recourse');
        }
      );
      return;
    }

    modalRef.current?.close();
    toastNotifications().toastSuccesCustomize('Se registró el progreso correctamente.');
    const progressData = await getProgressPerRecourse(recourseActive?.id);
    setProgressesPerRecourse(progressData);
  };

  return <ProgressView handleClick={handleClickNuevo} />;
};
