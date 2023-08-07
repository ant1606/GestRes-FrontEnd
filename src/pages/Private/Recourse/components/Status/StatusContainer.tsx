import React, { useRef } from 'react';
import StatusView from './StatusView';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import StatusForm from './components/Form/StatusForm';
import { useAppSelector } from '@/hooks/redux';
import { type RootState } from '@/redux/store';
import { StatusProvider } from './context/status.context';
import { useRecourse } from '../../context/recourse.context';
import { getStatusPerRecourse } from '@/services/status.services';

export const StatusContainer: React.FC = () => {
  const { recourseActive, setStatusesPerRecourse } = useRecourse();
  const { settingsStatus } = useAppSelector((state: RootState) => state.settings);
  const MySwal = withReactContent(Swal);
  const modalRef = useRef(MySwal);

  const handleClickNuevo = (): void => {
    MySwal.fire({
      title: 'Registrar nuevo estado',
      html: (
        <StatusProvider>
          <StatusForm
            listStatus={settingsStatus}
            modalRef={modalRef.current}
            recourseParent={recourseActive}
            onFormSubmit={() => {
              handleFormSubmit();
            }}
          />
        </StatusProvider>
      ),
      showConfirmButton: false,
      allowOutsideClick: false
    });
  };

  const handleFormSubmit = async (): Promise<void> => {
    modalRef.current?.close();
    const statusData = await getStatusPerRecourse(recourseActive?.id);
    setStatusesPerRecourse(statusData);
  };

  return (
    <StatusProvider>
      <StatusView handleClick={handleClickNuevo} />
    </StatusProvider>
  );
};
