import React from 'react';
import Button from '../../../Button.js';
import Modal from '../../Molecules/Modal';
import StatusForm from './components/Form/StatusForm.js';
import StatusTable from './components/Table/Table.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSettings from '../../../Context/SettingsContext.jsx';

const StatusMain = ({ handleClickParent, modalState }) => {
  const MySwal = withReactContent(Swal);
  const { settingsStatus } = useSettings();

  const handleClickNuevo = (): void => {
    // console.log(settingsStatus);
    MySwal.fire({
      title: <strong>Registrar nuevo estado</strong>,
      html: <StatusForm statusOptions={settingsStatus} />,
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
  // const handleClickAccepButton = () => {
  //     console.log("submiteado");
  // }
  return (
    <div>
      {/* <Button */}
      {/*  text="Registrar Nuevo" */}
      {/*  handleClick={handleClickParent} */}
      {/* /> */}
      <Button text="Registrar Nuevo" handleClick={handleClickNuevo} />

      {/* { */}
      {/*  modalState && ( */}
      {/*    <Modal */}
      {/*      title="Registrar nuevo Estado" */}
      {/*      modalState={modalState} */}
      {/*      handleClickParent={handleClickParent} */}
      {/*      modalContent={<StatusForm />} */}
      {/*      handleClickAcceptButton={handleClickAccepButton} */}
      {/*      /> */}
      {/*  ) */}
      {/* } */}

      <StatusTable />
    </div>
  );
};

export default StatusMain;
