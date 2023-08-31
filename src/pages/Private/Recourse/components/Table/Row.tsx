import React, { useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { GLOBAL_TYPES_RECOURSE } from '#/config/globalConstantes.js';
import { toastNotifications } from '#/utilities/notificationsSwal.js';
import { useRecourse } from '../../context/recourse.context';
import { destroyRecourse, getRecourses } from '#/services/recourse.services';
import { changeColorTitleBar, isLoading } from '#/redux/slice/uiSlice';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { type RootState } from '#/redux/store';
import { IconContext } from 'react-icons';
import { FaPencilAlt, FaTrashAlt, FaEye } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import { TbWorldWww } from 'react-icons/tb';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdDomain, MdOutlineLibraryBooks, MdOutlineTimer } from 'react-icons/md';
import { BiSolidBookContent, BiSolidCameraMovie } from 'react-icons/bi';

interface Props {
  recourse: Recourse;
}

const Row: React.FC<Props> = ({ recourse }) => {
  const [viewDetail, setviewDetail] = useState(false);
  const { settingsType, settingsStatus } = useAppSelector((state: RootState) => state.settings);
  const { setRecourses, selectedRecourse, addValidationError } = useRecourse();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  // TOOD ver como hacer de esto una funcion global o util para obtener el estilo
  const styleStatus = settingsStatus.find(
    (val) => val.value === recourse.currentStatusName
  )?.value2;

  function toggleviewDetail(): void {
    setviewDetail(!viewDetail);
  }

  const handleClickDeleteWrapper = (recourse: Recourse): void => {
    handleClickDelete(recourse);
  };
  const handleClickDelete = async (recourse: Recourse): Promise<void> => {
    try {
      const result = await toastNotifications().modalDeleteConfirm(recourse.name);
      if (!result) return;

      dispatch(isLoading(true));
      const response = await destroyRecourse(recourse);
      if ('data' in response) {
        toastNotifications().toastSuccesCustomize(
          `Se elimino la etiqueta ${recourse.name} satisfactoriamente`
        );
        const recourses = await getRecourses(searchParams.toString());
        setRecourses(recourses);
      } else if ('error' in response) {
        const errorsDetail = response.error?.detail;
        Object.keys(errorsDetail).forEach((key) => {
          if (key !== 'apiResponseMessageError') {
            addValidationError({ [key]: errorsDetail[key] });
          }
        });

        if ('apiResponseMessageError' in errorsDetail) {
          if (errorsDetail.apiResponseMessageError !== null)
            throw new Error(errorsDetail.apiResponseMessageError);
        }
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  const handleClickEdit = (recourse: Recourse): void => {
    selectedRecourse(recourse);
  };

  const handleClickShow = (recourse: Recourse): void => {
    dispatch(changeColorTitleBar(styleStatus === undefined ? null : styleStatus));
    selectedRecourse(recourse);
  };

  return (
    <>
      {/* Fila de Datos */}
      <tr>
        <td className=" w-48 h-14">
          {/* ${!viewDetail ? "scale-y-0 row_viewDetail_collapse" : ""} */}
          <div className="flex justify-between items-center gap-3 px-3 py-2">
            <button
              className={` ${!viewDetail ? '' : 'rotate-180'} 
              duration-300 transition-all w-8 h-8 flex justify-center items-center bg-gray-900 rounded-lg`}
              onClick={toggleviewDetail}>
              <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                <AiFillCaretDown />
              </IconContext.Provider>
            </button>
            <NavLink to={`/app/recourse/${recourse.id}`}>
              <button
                className="w-8 h-8  flex justify-center items-center bg-blue-700 rounded-lg"
                onClick={() => {
                  handleClickShow(recourse);
                }}>
                <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                  <FaEye />
                </IconContext.Provider>
              </button>
            </NavLink>

            <NavLink to={`/app/recourse/${recourse.id}/edit`}>
              <button
                className="w-8 h-8  flex justify-center items-center bg-yellow-400 rounded-lg"
                onClick={() => {
                  handleClickEdit(recourse);
                }}>
                <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                  <FaPencilAlt />
                </IconContext.Provider>
              </button>
            </NavLink>

            <button
              className="w-8 h-8  flex justify-center items-center bg-red-600 rounded-lg"
              onClick={() => {
                handleClickDeleteWrapper(recourse);
              }}>
              <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                <FaTrashAlt />
              </IconContext.Provider>
            </button>
          </div>
        </td>
        <td className="max-h-14 max-w-xs">
          <div className="flex justify-center items-center">
            <p className="text-lg font-semibold text-gray-900 truncate "> {recourse.name}</p>
          </div>
        </td>
        <td className="w-40 h-14 p-3">
          <div
            className={` 
            ${styleStatus === undefined ? 'bg-gray-900' : styleStatus.split(' ')[0]}
            flex justify-center items-center w-38 px-4 py-1 rounded-2xl`}>
            <span
              className={`
              ${styleStatus === undefined ? 'text-white' : styleStatus.split(' ')[1]}
              text-sm font-bold  uppercase`}>
              {recourse.currentStatusName}
            </span>
          </div>
        </td>
        <td className="w-36">
          <div className="flex flex-col p-3 items-center justify-center ">
            <div className="w-full">
              <div className="w-full h-3 bg-gray-800 rounded-full"></div>
            </div>
            {/* TODO Generar el calculo del avance de cada recurso */}
            <span className="text-gray-500 text-sm font-semibold">100%</span>
          </div>
        </td>
        <td className="w-56 ">
          <div className="px-3 text-center text-lg text-gray-900 font-semibold">
            <p>{recourse.typeName}</p>
          </div>
        </td>
      </tr>

      {/* Fila de Detalles */}
      {/* <tr className={ ` ${!viewDetail ? "scale-y-0 row_viewDetail_collapse" : ""} origin-top bg-gray-100 duration-300 transition-all`}> */}
      {/* <td className='max-h-14 max-w-xs'>
          <div className='flex justify-center items-center'>
            <p className='text-lg font-semibold text-gray-900 truncate '> Nombre del recurso 1 asdasdasdsadsadsa sadasdsa asdas asdasdasdas asd as adsasdasdasd dasdasd as dasd sad final</p>
          </div>
        </td> */}
      <tr className="">
        <td colSpan={5}>
          <div
            className={` ${!viewDetail ? 'max-h-0 px-0 py-0' : 'max-h-44 px-8 py-4 bg-gray-100'} 
            origin-top duration-300 transition-all flex flex-col items-stretch text-base font-semibold overflow-y-scroll`}>
            <div className="flex gap-4 pb-3 ">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <TbWorldWww />
              </IconContext.Provider>
              <p className="truncate max-w-4xl">{recourse.source}</p>
            </div>
            <div className="flex justify-between gap-4">
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex gap-4">
                  <IconContext.Provider value={{ size: '1.5em' }}>
                    <BsFillPersonFill />
                  </IconContext.Provider>
                  <p>{recourse.author}</p>
                </div>
                <div className="flex gap-4">
                  <IconContext.Provider value={{ size: '1.5em' }}>
                    <MdDomain />
                  </IconContext.Provider>
                  <p>{recourse.editorial}</p>
                </div>
                <div className="flex">
                  {recourse.typeName ===
                    settingsType.find((val) => val.key === GLOBAL_TYPES_RECOURSE.RECOURSE_TYPE_LIBRO)
                      ?.value ? (
                    <>
                      <div className="flex gap-4 w-2/4">
                        <IconContext.Provider value={{ size: '1.5em' }}>
                          <MdOutlineLibraryBooks />
                        </IconContext.Provider>
                        <p>{recourse.totalPages}</p>
                      </div>
                      <div className="flex gap-4">
                        <IconContext.Provider value={{ size: '1.5em' }}>
                          <BiSolidBookContent />
                        </IconContext.Provider>
                        <p>{recourse.totalChapters}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-4 w-2/4">
                        <IconContext.Provider value={{ size: '1.5em' }}>
                          <BiSolidCameraMovie />
                        </IconContext.Provider>
                        <p>{recourse.totalVideos}</p>
                      </div>
                      <div className="flex gap-4">
                        <IconContext.Provider value={{ size: '1.5em' }}>
                          <MdOutlineTimer />
                        </IconContext.Provider>
                        <p>{recourse.totalHours}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* TODO Hacer scrollear las etiquetas */}
              <div className="flex flex-1 justify-start items-start flex-wrap gap-2 leading-1">
                {recourse?.tags.map((tag) => (
                  <div
                    key={tag.id}
                    className={`${tag.style} m-0 h-7 shrink px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase`}>
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Row;
