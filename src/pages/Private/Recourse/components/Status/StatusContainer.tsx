import React from 'react';
import StatusView from './StatusView';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export const StatusContainer: React.FC = () => {
  const MySwal = withReactContent(Swal);

  const handleClickNuevo = (): void => {
    // console.log(settingsStatus);
    MySwal.fire({
      title: <strong>Registrar nuevo estado</strong>,
      html: <div>Hola mi formulario</div>,
      showCancelButton: true,
      confirmButtonText: 'ACEPTAR',
      cancelButtonText: 'CANCELAR',
      reverseButtons: true,
      customClass: {
        confirmButton:
          'bg-green-600 rounded-xl text-white py-2 px-5 text-xl font-medium hover:bg-green-700',
        cancelButton:
          'bg-red-600 rounded-xl text-white py-2 px-5 text-xl font-medium hover:bg-red-900',
        actions: 'gap-10'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Guardar');
      } else if (result.isDismissed) {
        console.log('Cancelado');
      }
    });
  };

  return <StatusView handleClick={handleClickNuevo} />;
};
