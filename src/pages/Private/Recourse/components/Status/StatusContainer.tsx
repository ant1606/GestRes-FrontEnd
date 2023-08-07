import React, { useRef } from 'react';
import StatusView from './StatusView';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import StatusForm from './components/Form/StatusForm';
import { useAppSelector } from '@/hooks/redux';
import { type RootState } from '@/redux/store';
import { StatusProvider } from './context/status.context';
import { useRecourse } from '../../context/recourse.context';

export const StatusContainer: React.FC = () => {
  const { recourseActive } = useRecourse();
  const { settingsStatus } = useAppSelector((state: RootState) => state.settings);
  const MySwal = withReactContent(Swal);
  const modalRef = useRef(MySwal);

  const handleClickNuevo = (): void => {
    // console.log(settingsStatus);

    MySwal.fire({
      title: 'Registrar nuevo estado',
      html: (
        <StatusProvider>
          <StatusForm
            listStatus={settingsStatus}
            modalRef={modalRef.current}
            recourseParent={recourseActive}
          />
        </StatusProvider>
      ),
      showConfirmButton: false,
      allowOutsideClick: false
    });
    //   showCancelButton: true,
    //   confirmButtonText: 'REGISTRAR',
    //   cancelButtonText: 'CANCELAR',
    //   reverseButtons: true,
    //   customClass: {
    //     confirmButton:
    //       'bg-green-600 rounded-xl text-white py-2 px-5 text-xl font-medium hover:bg-green-700',
    //     cancelButton:
    //       'bg-red-600 rounded-xl text-white py-2 px-5 text-xl font-medium hover:bg-red-900',
    //     actions: 'gap-10'
    //   },
    //   buttonsStyling: false
    // }).then((result) => {
    //   console.log(result.value);
    //   if (result.isConfirmed) {
    //     console.log('Guardar');
    //   } else if (result.isDismissed) {
    //     console.log('Cancelado');
    //   }
    // });
  };

  return (
    <StatusProvider>
      <StatusView handleClick={handleClickNuevo} />
    </StatusProvider>
  );
};
