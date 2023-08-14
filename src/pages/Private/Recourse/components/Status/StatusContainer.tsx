import React, { useEffect, useRef } from 'react';
import StatusView from './StatusView';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import StatusForm from './components/Form/StatusForm';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { type RootState } from '@/redux/store';
import { StatusProvider, useStatus } from './context/status.context';
import { useRecourse } from '../../context/recourse.context';
import { getStatusPerRecourse } from '@/services/status.services';
import { GLOBAL_STATUS_RECOURSE } from '@/config/globalConstantes';
import { toastNotifications } from '@/utilities/notificationsSwal';
import { changeColorTitleBar } from '@/redux/slice/uiSlice';
import { getRecourse } from '@/services/recourse.services';

interface ReactPaginaOnPageChangeArgument {
  selected: number;
}

export const StatusContainer: React.FC = () => {
  const { recourseActive, selectedRecourse } = useRecourse();
  const { setStatuses } = useStatus();
  const { settingsStatus } = useAppSelector((state: RootState) => state.settings);
  const MySwal = withReactContent(Swal);
  const modalRef = useRef(MySwal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchFirstTimeStatuses = async (): Promise<void> => {
      const statuses = await getStatusPerRecourse(recourseActive.id, 1);
      setStatuses(statuses);
    };
    searchFirstTimeStatuses();
  }, []);

  const handleClickNuevo = (): void => {
    // TODO Obtener el ultimo estado
    const lastStatusName = recourseActive.status.statusName as string;
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
            onFormSubmit={(statusIdRegistered) => {
              handleFormSubmit(statusIdRegistered);
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

  const handleFormSubmit = async (statusIdRegistered: number): Promise<void> => {
    modalRef.current?.close();
    toastNotifications().toastSuccesCustomize('Se registró el estado correctamente.');
    const statuses = await getStatusPerRecourse(recourseActive.id, 1);
    setStatuses(statuses);

    // const lastStatus = statusData.data[statusData.data.length - 1];
    const styleStatus = settingsStatus.find((val) => val.id === statusIdRegistered)?.value2;
    dispatch(changeColorTitleBar(styleStatus === undefined ? null : styleStatus));
    const recourseRefreshed = await getRecourse(recourseActive.id);
    selectedRecourse(recourseRefreshed.data);
  };

  const handlePageChange = async (e: ReactPaginaOnPageChangeArgument): Promise<void> => {
    const statuses = await getStatusPerRecourse(recourseActive.id, e.selected + 1);
    console.log(statuses);
    setStatuses(statuses);
  };

  const handlePageChangeWrapper = (e: ReactPaginaOnPageChangeArgument): void => {
    handlePageChange(e);
  };

  return <StatusView handleClick={handleClickNuevo} handlePageChange={handlePageChangeWrapper} />;
};
