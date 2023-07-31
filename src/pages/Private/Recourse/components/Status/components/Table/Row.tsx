import Modal from '@/components/Modal';
import { mdiTrashCan } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';

interface Props {
  isLastStatus: boolean;
  status: Status;
}
const Row: React.FC<Props> = ({ isLastStatus, status }) => {
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);

  const handleClickDeleteModal = (): void => {
    setToggleDeleteModal(!toggleDeleteModal);
  };

  const handleClickDelete = (): void => {
    console.log('Eliminando');
  };

  return (
    <tr className="h-12">
      <td className="w-36">
        <div className="flex justify-center">
          {isLastStatus && (
            <>
              <button
                className="w-8 h-8 flex justify-center items-center bg-red-600 rounded-lg cursor-pointer"
                onClick={handleClickDeleteModal}>
                <Icon path={mdiTrashCan} title="Down" size={1} color="white" />
              </button>
              {toggleDeleteModal && (
                <Modal
                  title="Eliminar Estado"
                  modalState={toggleDeleteModal}
                  handleClickAcceptButton={handleClickDelete}
                  handleClickParent={handleClickDeleteModal}
                  modalContent={
                    <p className="text-center text-xl font-medium">
                      ¿Está seguro que desea eliminar el registro del Estado?
                    </p>
                  }
                />
              )}
            </>
          )}
        </div>
      </td>

      <td className="w-32  text-center">{status?.date}</td>

      <td className="w-44 ">
        <div className="flex justify-center">
          <div className="flex justify-center items-center w-38 px-4 py-1 rounded-2xl bg-gray-900">
            <span className="text-sm font-bold text-white uppercase">{status?.statusName}</span>
          </div>
        </div>
      </td>

      <td className="">{status?.comment}</td>
    </tr>
  );
};

export default Row;
