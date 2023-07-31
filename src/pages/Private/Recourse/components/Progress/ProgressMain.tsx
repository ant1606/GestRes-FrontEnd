import React from 'react';
import Button from '../../../Button.js';
import Modal from '../../Molecules/Modal.js';
import ProgressForm from './components/Form/ProgressForm.js';
import ProgressTable from './components/Table/Table.js';

const ProgressMain = ({ handleClickParent, modalState }) => {
  return (
    <div>
      <Button text="Registrar Nuevo" handleClick={handleClickParent} />

      {modalState && (
        <Modal
          title="Registro de nuevo Progreso"
          modalState={modalState}
          handleClickParent={handleClickParent}
          modalContent={<ProgressForm />}
        />
      )}

      <ProgressTable />
    </div>
  );
};

export default ProgressMain;
