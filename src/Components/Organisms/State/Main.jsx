import React from 'react'
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';
import Button from '../../Atoms/Button';
import Modal from '../../Molecules/Modal';
import StateForm from './Form'

const Main = ({handleClickParent, modalState}) => {
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
            modalContent={<StateForm />}
            />
        )
      }

      <table className='table-auto w-full mt-8'>
        <thead>
          <tr className='text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase'>
            <th className='w-36'>ACCIONES</th>
            <th className='w-32'>FECHA</th>
            <th className='w-44'>ESTADO</th>
            <th className=''>COMENTARIO</th>
          </tr>
        </thead>
        <tbody>
          <tr className='h-12'>

            <td className='w-36'>
              <div className='flex justify-center'>
                <button className='w-8 h-8 flex justify-center items-center bg-red-600 rounded-lg cursor-pointer'>
                    <Icon path={mdiTrashCan}
                      title="Down"
                      size={1}
                      color="white"
                    />
                </button>
              </div>
            </td>

            <td className='w-32  text-center'>
              15/05/2022
            </td>

            <td className='w-44 '>
              <div className='flex justify-center'>
                <div className='flex justify-center items-center w-38 px-4 py-1 rounded-2xl bg-gray-900'>
                  <span className='text-sm font-bold text-white uppercase'>
                    POR EMPEZAR
                  </span>
                </div>
              </div>
            </td>

            <td className=''>
              Comentario
            </td>

          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default Main