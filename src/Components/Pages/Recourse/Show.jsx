import { mdiTrashCan } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useContext, useEffect, useState } from 'react'
import TitleContext from '../../../Context/TitleContext';
import Form from '../../Organisms/Recourse/Form'

const Show = () => {
  const {changeTitle} = useContext(TitleContext);
  const [toggleTab, setToggleTab] = useState(1);

  useEffect(()=>{
    changeTitle("Recursos Educativos / Ver");
  }, []);

  console.log(toggleTab);

  return (
    <>
      <div className='flex text-gray-900 font-semibold max-w-full'>
        <div 
          className={` ${toggleTab === 1 ? "text-white bg-gray-900 border-b-0" : "" } cursor-pointer grow border-2 text-center uppercase border-gray-900 py-3 px-10 `}
          onClick={()=> setToggleTab(1)}
        >
          Detalles
        </div>
        <div 
          className={`${toggleTab === 2 ? "text-white bg-gray-900 border-b-0" : "" } cursor-pointer grow border-2 text-center uppercase border-gray-900 border-l-0 py-3 px-10`}
          onClick={()=> setToggleTab(2)}
        >
          Estado
        </div>
        <div 
          className={`${toggleTab === 3 ? "text-white bg-gray-900 border-b-0" : "" } cursor-pointer grow border-2 text-center uppercase border-gray-900 border-l-0 py-3 px-10`}
          onClick={()=> setToggleTab(3)}
        >
          Progreso
        </div>
      </div>
      
      <div className='border-2  h-[32rem] border-gray-900 border-t-0 overflow-y-scroll px-8 py-5' >
        <div className={`${toggleTab === 1 ? "" : "hidden"}`}>
          <Form />
        </div>

        <div className={`${toggleTab === 2 ? "" : "hidden"}`}>
          <div>
            <button className='bg-gray-900 rounded-xl text-white py-2 px-5 text-2xl font-medium
          hover:bg-gray-800 mb-4'>
              Registrar nuevo
            </button>

            <table className='table-auto w-full'>
              <thead>
                <tr className='text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase '>
                  <th className='w-36 '>ACCIONES</th>
                  <th className='w-32 '>FECHA</th>
                  <th className='w-44 '>ESTADO</th>
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
        </div>

        <div className={`${toggleTab === 3 ? "" : "hidden"}`}>
        <div>
            <button className='bg-gray-900 rounded-xl text-white py-2 px-5 text-2xl font-medium
          hover:bg-gray-800 mb-4'>
              Registrar nuevo
            </button>

            <table className='table-auto w-full'>
              <thead>
                <tr className='text-gray-600 border-b-gray-400 border-b-2 font-bold text-uppercase '>
                  <th className='w-36 '>ACCIONES</th>
                  <th className='w-32 '>FECHA</th>
                  <th className='w-36 '>AVANCE</th>
                  <th className='w-36 '>PENDIENTE</th>
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

                  <td className='w-36 text-center'>
                    15
                  </td>

                  <td className='w-36 text-center'>
                    50
                  </td>

                  <td className=''>
                    Comentario
                  </td>

                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  )
}

// https://www.youtube.com/watch?v=9DwGahSqcEc MOdal en React

export default Show