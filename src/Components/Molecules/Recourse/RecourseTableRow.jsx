import React, { useState } from 'react'
import Icon from '@mdi/react'
import { 
  mdiWeb, 
  mdiTooltipAccount, 
  mdiDomain,
  mdiArrowDownDropCircle,
  mdiEye,
  mdiPencil,
  mdiTrashCan,
  mdiBookOpenPageVariantOutline, 
  mdiTextBoxMultipleOutline,
  mdiVideoVintage, 
  mdiTimerOutline,
} from '@mdi/js';
import { Link } from 'react-router-dom';
import Modal from '../Modal';

const RecourseTableRow = () => {
  const [detail, setDetail] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);

  function toggleDetail() {
    setDetail(!detail);
  }

  const handleClickDeleteModal = () => {
    // console.log("Mostrar modal");
    setToggleDeleteModal(!toggleDeleteModal)
  }

  return (
    <>
      {
        toggleDeleteModal && (
          <Modal 
            title="Eliminar recurso" 
            modalState={toggleDeleteModal} 
            handleClickParent={handleClickDeleteModal}
            modalContent={(<p className='text-center text-xl font-medium'>¿Está seguro que desea eliminar el recurso?</p>)}
          />
        )
      }
      {/* Fila de Datos */}
      <tr>
        <td className=' w-48 h-14'>
        {/* ${!detail ? "scale-y-0 row_detail_collapse" : ""} */}
          <div className="flex justify-between items-center gap-3 px-3 py-2">
            <button className={`${!detail ? "" : "rotate-180"} duration-300 transition-all w-8 h-8 flex justify-center items-center bg-gray-900 rounded-lg`} onClick={toggleDetail}>
              <Icon path={mdiArrowDownDropCircle}
                title="Down"
                size={1}
                color="white"
              />
            </button>
            <Link to="/recursos/show">
              <button className="w-8 h-8  flex justify-center items-center bg-blue-700 rounded-lg">
                <Icon path={mdiEye}
                  title="RecourseScreenShow"
                  size={1}
                  color="white"
                />
              </button>
            </Link>
            
            <button className="w-8 h-8  flex justify-center items-center bg-yellow-400 rounded-lg">
              <Icon path={mdiPencil}
                title="Edit"
                size={1}
                color="white"
              />
            </button>
            <button 
              className="w-8 h-8  flex justify-center items-center bg-red-600 rounded-lg"
              onClick={handleClickDeleteModal}
            >
              <Icon path={mdiTrashCan}
                title="Delete"
                size={1}
                color="white"
              />
            </button>
          </div>
        </td>
        <td className='max-h-14 max-w-xs'>
          <div className='flex justify-center items-center'>
            <p className='text-lg font-semibold text-gray-900 truncate '> Nombre del recurso 1 asdasdasdsadsadsa sadasdsa asdas asdasdasdas asd as adsasdasdasd dasdasd as dasd sad final</p>
          </div>
        </td>
        <td className='w-40 h-14 p-3'>
          <div className='flex justify-center items-center w-38 px-4 py-1 rounded-2xl bg-gray-900'>
            <span className='text-sm font-bold text-white uppercase'>
              POR EMPEZAR
            </span>
          </div>
        </td>
        <td className='w-36' >
          <div className='flex flex-col p-3 items-center justify-center '>
            <div className='w-full'>
              <div className='w-full h-3 bg-gray-800 rounded-full'></div>
            </div>
            <span className='text-gray-500 text-sm font-semibold'>100%</span>
          </div>
        </td>
        <td className='w-56 '>
          <div className='px-3 text-center text-lg text-gray-900 font-semibold'>
            <p>LIBRO ELECTRÓNICO</p>
          </div>
        </td>
      </tr>

      {/* Fila de Detalles */}
      {/* <tr className={ ` ${!detail ? "scale-y-0 row_detail_collapse" : ""} origin-top bg-gray-100 duration-300 transition-all`}> */}
      {/* <td className='max-h-14 max-w-xs'>
          <div className='flex justify-center items-center'>
            <p className='text-lg font-semibold text-gray-900 truncate '> Nombre del recurso 1 asdasdasdsadsadsa sadasdsa asdas asdasdasdas asd as adsasdasdasd dasdasd as dasd sad final</p>
          </div>
        </td> */}
      <tr className="">
        <td colSpan={5}>
          <div className={`${!detail ? "max-h-0 px-0 py-0" : "max-h-44 px-8 py-4 bg-gray-100"}  origin-top duration-300 transition-all flex flex-col items-stretch text-base font-semibold overflow-y-scroll`}>
            <div className='flex gap-4 pb-3 '>
              <Icon path={mdiWeb}
                title="Source"
                size={1}
                color="rgb(17 24 39 / 1)"
                />
              <p className='truncate max-w-4xl'>https://www.udemy.com/cursos/carlos1231/curso-de-programacion-funcional-javascript-asdasdlkajsdklasjdlkasjdlkasjdklajslkdjaslkdjalksjdlkasjdlkasjdlkajsdklajsdlkjaslkdaslkjdalskjdklasjdklsa</p>
            </div>
            <div className='flex justify-between gap-4' >
              <div className='flex flex-1 flex-col gap-3'>
                <div className='flex gap-4'>
                  <Icon path={mdiTooltipAccount}
                    title="Source"
                    size={1}
                    color="rgb(17 24 39 / 1)"
                  />
                  <p>Carlos Azaustre</p>
                </div>
                <div className='flex gap-4'>
                  <Icon path={mdiDomain}
                    title="Source"
                    size={1}
                    color="rgb(17 24 39 / 1)"
                  />
                  <p>Udemy</p>
                </div>
                <div className='flex'>
                  <div className='flex gap-4 w-2/4'>
                    <Icon path={mdiVideoVintage}
                      title="Source"
                      size={1}
                      color="rgb(17 24 39 / 1)"
                    />
                    <p>153</p>
                  </div>
                  <div className='flex gap-4'>
                    <Icon path={mdiTimerOutline}
                      title="Source"
                      size={1}
                      color="rgb(17 24 39 / 1)"
                    />
                    <p>50:30:12</p>
                  </div>
                </div>
              </div>
              {/* TODO Hacer scrollear las etiquetas */}
              <div className='flex flex-1 justify-start items-start flex-wrap gap-2 leading-1'>
                <span className='bg-gray-900 m-0 h-7 shrink px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase'>
                  Programacion funcional
                </span>
                <span className='bg-gray-900 h-7 px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase'>
                  Ethical Hacking
                </span>
                <span className='bg-gray-900 h-7 px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase'>
                  CSS
                </span>
                <span className='bg-gray-900 h-7 px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase'>
                  HTML
                </span>
                <span className='bg-gray-900 h-7 px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase'>
                  Base de Datos
                </span>
                <span className='bg-gray-900 h-7 px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase'>
                  Arquitectura de Software
                </span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}

export default RecourseTableRow