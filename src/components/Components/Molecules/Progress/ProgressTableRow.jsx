import React, { useState } from 'react'
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';
import Modal from '../Modal';

const ProgressTableRow = ({last, progress}) => {

  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);

  const handleClickDeleteModal = () => {
    setToggleDeleteModal(!toggleDeleteModal);
  }

  return (
    <tr className='h-12'>

      <td className='w-36'>
        <div className='flex justify-center'>
          
            {
              last && (
                <>
                  <button 
                    className='w-8 h-8 flex justify-center items-center bg-red-600 rounded-lg cursor-pointer'
                    onClick={handleClickDeleteModal}
                  >
                    <Icon path={mdiTrashCan}
                      title="Down"
                      size={1}
                      color="white"
                    />
                  </button>
                  {
                    toggleDeleteModal && (
                      <Modal
                        title="Eliminar Progreso"
                        modalState={toggleDeleteModal}
                        handleClickParent={handleClickDeleteModal}
                        modalContent={(<p className='text-center text-xl font-medium'>¿Está seguro que desea eliminar el registro del Progreso?</p>)}
                      />
                    )
                  }
                </>
              )
            }
          
        </div>
      </td>

      <td className='w-32  text-center'>
          {progress?.fecha}
      </td>

      <td className='w-36 text-center'>
          {progress?.realizado}
      </td>

      <td className='w-36 text-center'>
          {progress?.pendiente}
      </td>

      <td className=''>
          {progress?.comentario}
      </td>

    </tr>
  )
}

export default ProgressTableRow