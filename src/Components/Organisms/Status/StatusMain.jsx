import React from 'react'
import Button from '../../Atoms/Button';
import Modal from '../../Molecules/Modal';
import StatusForm from './StatusForm.jsx'
import StatusTable from './StatusTable.jsx'
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

const StatusMain = ({handleClickParent, modalState}) => {
    // const MySwal = withReactContent(Swal)
    //
    // const handleClickNuevo = () => {
    //     MySwal.fire({
    //         title: <strong>Registrar nuevo estado</strong>,
    //         html: <StatusForm />,
    //         showCancelButton: true,
    //         confirmButtonText: 'ACEPTAR',
    //         cancelButtonText: 'CANCELAR',
    //         reverseButtons: true,
    //         customClass: {
    //             confirmButton: 'bg-green-600 rounded-xl text-white py-2 px-5 text-xl font-medium hover:bg-green-700',
    //             cancelButton: 'bg-red-600 rounded-xl text-white py-2 px-5 text-xl font-medium hover:bg-red-900',
    //             actions: 'gap-10'
    //         },
    //         buttonsStyling: false
    //     })
    // }
  return (
    <div>
      <Button 
        text="Registrar Nuevo"
        handleClick={handleClickParent}
      />

      {
        modalState && (
          <Modal
            title="Registrar nuevo Estado"
            modalState={modalState}
            handleClickParent={handleClickParent}
            modalContent={<StatusForm />}
            />
        )
      }

      <StatusTable />      

    </div>
  )
}

export default StatusMain