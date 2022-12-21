import React from 'react'
import Button from '../../Atoms/Button';
import Modal from '../../Molecules/Modal';
import ProgressForm from './ProgressForm.jsx'
import ProgressTable from './ProgressTable.jsx'

const ProgressMain = ({handleClickParent, modalState}) => {

  return (
    <div>
      <Button 
        text="Registrar Nuevo"
        handleClick={handleClickParent}
      />

      {
        modalState && (
          <Modal 
            title="Registro de nuevo Progreso" 
            modalState={modalState} 
            handleClickParent={handleClickParent}
            modalContent={<ProgressForm />}
          />
        ) 
      }
      
      <ProgressTable />
      
    </div>
  )
}

export default ProgressMain