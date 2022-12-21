import React from 'react'
import Button from '../../Atoms/Button';
import Modal from '../../Molecules/Modal';
import StatusForm from './StatusForm.jsx'
import StatusTable from './StatusTable.jsx'

const StatusMain = ({handleClickParent, modalState}) => {
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