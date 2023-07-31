import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';
import Modal from '@/components/Modal';

interface Props {
  isLastProgress: boolean;
  progress: Progress;
}

const Row: React.FC<Props> = ({ isLastProgress, progress }) => {
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);

  const handleClickDeleteModal = (): void => {
    setToggleDeleteModal(!toggleDeleteModal);
  };

  const handleClickDelete = (): void => {
    console.log('eliminar');
  };
  return (
    <tr className="h-12">
      <td className="w-36">
        <div className="flex justify-center">
          {isLastProgress && (
            <>
              <button
                className="w-8 h-8 flex justify-center items-center bg-red-600 rounded-lg cursor-pointer"
                onClick={handleClickDeleteModal}>
                <Icon path={mdiTrashCan} title="Down" size={1} color="white" />
              </button>
              {toggleDeleteModal && (
                <Modal
                  handleClickAcceptButton={handleClickDelete}
                  title="Eliminar Progreso"
                  modalState={toggleDeleteModal}
                  handleClickParent={handleClickDeleteModal}
                  modalContent={
                    <p className="text-center text-xl font-medium">
                      ¿Está seguro que desea eliminar el registro del Progreso?
                    </p>
                  }
                />
              )}
            </>
          )}
        </div>
      </td>

      <td className="w-32  text-center">{progress?.date}</td>

      <td className="w-36 text-center">{progress?.done}</td>

      <td className="w-36 text-center">{progress?.pending}</td>

      <td className="">{progress?.comment}</td>
    </tr>
  );
};

export default Row;
