import React, { useEffect, useRef } from 'react';
import ProgressView from './ProgressView';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useRecourse } from '../../context/recourse.context';
import ProgressForm from './components/Form/ProgressForm';
import { ProgressProvider, useProgress } from './context/progress.context';
import { getProgressPerRecourse } from '#/services/progress.services';
import { GLOBAL_STATUS_RECOURSE } from '#/config/globalConstantes';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { getRecourse } from '#/services/recourse.services';
import { useAppSelector } from '#/hooks/redux';
import { type RootState } from '#/redux/store';
import { type RecourseSuccessResponse } from '../../index.types';
import { type ProgressesPaginatedSuccessResponse } from './indext.types';

interface ReactPaginaOnPageChangeArgument {
  selected: number;
}

export const ProgressContainer: React.FC = () => {
  const { recourseActive, selectedRecourse } = useRecourse();
  const { setProgresses } = useProgress();
  const { settingsUnitMeasureProgress } = useAppSelector((state: RootState) => state.settings);
  const MySwal = withReactContent(Swal);
  const modalRef = useRef(MySwal);
  const navigate = useNavigate();

  useEffect(() => {
    const searchFirstTimeStatuses = async (): Promise<void> => {
      const progresses = (await getProgressPerRecourse(
        recourseActive.id
      )) as ProgressesPaginatedSuccessResponse;
      setProgresses(progresses);
    };
    searchFirstTimeStatuses();
  }, []);

  const handleClickNuevo = (): void => {
    const lastStatusName = recourseActive.status.statusName as string;
    const lastPendingAmount = recourseActive.progress.pending as number;
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
              listUnitMeasure={settingsUnitMeasureProgress}
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
    const progressData = (await getProgressPerRecourse(
      recourseActive?.id
    )) as ProgressesPaginatedSuccessResponse;
    setProgresses(progressData);
    const recourseRefreshed = (await getRecourse(recourseActive.id)) as RecourseSuccessResponse;
    selectedRecourse(recourseRefreshed.data);
  };

  const handlePageChange = async (e: ReactPaginaOnPageChangeArgument): Promise<void> => {
    const statuses = await getProgressPerRecourse(recourseActive.id, e.selected + 1);
    setProgresses(statuses);
  };

  const handlePageChangeWrapper = (e: ReactPaginaOnPageChangeArgument): void => {
    handlePageChange(e);
  };

  return <ProgressView handleClick={handleClickNuevo} handlePageChange={handlePageChangeWrapper} />;
};
