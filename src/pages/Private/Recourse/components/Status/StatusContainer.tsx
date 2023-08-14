import React, { useRef } from 'react';
import StatusView from './StatusView';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import StatusForm from './components/Form/StatusForm';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { type RootState } from '@/redux/store';
import { StatusProvider } from './context/status.context';
import { useRecourse } from '../../context/recourse.context';
import { getStatusPerRecourse } from '@/services/status.services';
import { GLOBAL_STATUS_RECOURSE } from '@/config/globalConstantes';
import { toastNotifications } from '@/utilities/notificationsSwal';
import { changeColorTitleBar } from '@/redux/slice/uiSlice';

export const StatusContainer: React.FC = () => {
  const { recourseActive, setStatusesPerRecourse } = useRecourse();
  const { settingsStatus } = useAppSelector((state: RootState) => state.settings);
  const MySwal = withReactContent(Swal);
  const modalRef = useRef(MySwal);
  const dispatch = useAppDispatch();

  const handleClickNuevo = (): void => {
    const lastStatusName = recourseActive.status[recourseActive.status.length - 1]
      .statusName as string;
    if (
      lastStatusName === GLOBAL_STATUS_RECOURSE.CULMINADO ||
      lastStatusName === GLOBAL_STATUS_RECOURSE.DESCARTADO
    ) {
      // TODO Ver como dar el salto de linea en el texto
      toastNotifications().notificationError(
        `El último estado del recurso es ${lastStatusName} y no puede ser cambiado. Si desea modificar el estado, deberá eliminar el último registro de estado del recurso`
      );
      return;
    }

    const statusAvailable = getAvailableStatuses(settingsStatus, lastStatusName);

    MySwal.fire({
      title: 'Registrar nuevo estado',
      html: (
        <StatusProvider>
          <StatusForm
            listStatus={statusAvailable}
            modalRef={modalRef.current}
            recourseParent={recourseActive}
            onFormSubmit={() => {
              handleFormSubmit();
            }}
            recourseStatus={settingsStatus}
          />
        </StatusProvider>
      ),
      showConfirmButton: false,
      allowOutsideClick: false
    });
  };

  const getAvailableStatuses = (recourseStatuses: Settings[], lastStatus: string): Settings[] => {
    if (lastStatus === GLOBAL_STATUS_RECOURSE.REGISTRADO) {
      return recourseStatuses.filter(
        (status) =>
          status.value === GLOBAL_STATUS_RECOURSE.POR_EMPEZAR ||
          status.value === GLOBAL_STATUS_RECOURSE.DESFASADO
      );
    }
    if (lastStatus === GLOBAL_STATUS_RECOURSE.POR_EMPEZAR) {
      return recourseStatuses.filter(
        (status) =>
          status.value === GLOBAL_STATUS_RECOURSE.EN_PROCESO ||
          status.value === GLOBAL_STATUS_RECOURSE.DESFASADO
      );
    }
    if (lastStatus === GLOBAL_STATUS_RECOURSE.EN_PROCESO) {
      return recourseStatuses.filter(
        (status) =>
          status.value === GLOBAL_STATUS_RECOURSE.CULMINADO ||
          status.value === GLOBAL_STATUS_RECOURSE.DESCARTADO
      );
    }
    if (lastStatus === GLOBAL_STATUS_RECOURSE.DESFASADO) {
      return recourseStatuses.filter(
        (status) => status.value === GLOBAL_STATUS_RECOURSE.POR_EMPEZAR
      );
    }
    return recourseStatuses;
  };

  const handleFormSubmit = async (): Promise<void> => {
    modalRef.current?.close();
    toastNotifications().toastSuccesCustomize('Se registró el estado correctamente.');
    const statusData = await getStatusPerRecourse(recourseActive?.id);
    setStatusesPerRecourse(statusData);
    const lastStatus = statusData.data[statusData.data.length - 1];
    const styleStatus = settingsStatus.find((val) => val.value === lastStatus.statusName)?.value2;
    dispatch(changeColorTitleBar(styleStatus === undefined ? null : styleStatus));
  };

  return (
    <StatusProvider>
      <StatusView handleClick={handleClickNuevo} />
    </StatusProvider>
  );
};
