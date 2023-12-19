import React, { useRef, useState } from 'react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { useAppDispatch } from '#/hooks/redux';
import { isLoading } from '#/redux/slice/uiSlice';
import { focusInput } from '#/utilities/manipulationDom';
import { destroyTag, getTags } from '#/services/tag.services';
import { IconContext } from 'react-icons';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { SubscriptionYoutubeProvider } from '../../context/subscription.context';
import { AiFillCaretDown } from 'react-icons/ai';
import { IoMdPricetags } from 'react-icons/io';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Form from '../Form/Form';

interface Prop {
  youtubeSubscription: YoutubeSubscription;
}
const Row: React.FC<Prop> = ({ youtubeSubscription }) => {
  const [viewDetail, setviewDetail] = useState(false);
  const MySwal = withReactContent(Swal);
  const modalRef = useRef(MySwal);
  function toggleviewDetail(): void {
    setviewDetail(!viewDetail);
  }
  // const { selectedTag, resetValidationError, cleanSelectedTag, setTags, addValidationError } =
  //   useYoutubeSubscription();

  // const [searchParams] = useSearchParams();
  // const dispatch = useAppDispatch();

  // const handleClickEdit = (tag: Tag): void => {
  //   resetValidationError();
  //   selectedTag(tag);
  //   focusInput('#name');
  // };

  // const handleClickDelete = async (tag: Tag): Promise<void> => {
  //   try {
  //     const result = await toastNotifications().modalDeleteConfirm(tag.name);
  //     if (!result) return;

  //     dispatch(isLoading(true));
  //     const response = await destroyTag(tag);
  //     if ('data' in response) {
  //       resetValidationError();
  //       toastNotifications().toastSuccesCustomize(
  //         `Se elimino la etiqueta ${tag.name} satisfactoriamente`
  //       );
  //       cleanSelectedTag();
  //       const tags = await getTags(searchParams.toString());
  //       setTags(tags);
  //     } else if ('error' in response) {
  //       const errorsDetail = response.error?.detail;
  //       Object.keys(errorsDetail).forEach((key) => {
  //         if (key !== 'apiResponseMessageError') {
  //           addValidationError({ [key]: errorsDetail[key] });
  //         }
  //       });

  //       if ('apiResponseMessageError' in errorsDetail) {
  //         if (errorsDetail.apiResponseMessageError !== null)
  //           throw new Error(errorsDetail.apiResponseMessageError);
  //       }
  //     }
  //   } catch (error: any) {
  //     toastNotifications().notificationError(error.message);
  //   } finally {
  //     dispatch(isLoading(false));
  //   }
  // };

  const handleClickEdit = (youtubeSubscription: YoutubeSubscription): void => {
    // TODO: Implementar el modal en el componente Table para evitar múltiples renderizados en Row, y manipular los datos
    // por medio del contexto. Se inteno renderizar el modal con SweetAlert mediante una renderización condicional pero no funciono
    // Intentar hacer lo mismo pero com un componente Modal
    // Este cambio sugerido es para verificar la performance
    MySwal.fire({
      title: 'Editar Etiquetas',
      html: (
        <BrowserRouter>
          <SubscriptionYoutubeProvider>
            <Form
              modalRef={modalRef.current}
              subscription={youtubeSubscription}
              onFormSubmit={() => {
                handleFormSubmit();
              }}
            />
          </SubscriptionYoutubeProvider>
        </BrowserRouter>
      ),
      showConfirmButton: false,
      allowOutsideClick: true
    });
  };

  const handleFormSubmit = async (): Promise<void> => {
    modalRef.current?.close();
    toastNotifications().toastSuccesCustomize('Se actualizaron las etiquetas correctamente.');
    // const progressData = await getProgressPerRecourse(recourseActive?.id, 1);
    // setProgresses(progressData);
    // const recourseRefreshed = await getRecourse(recourseActive.id);
    // selectedRecourse(recourseRefreshed.data);
  };

  return (
    <>
      <tr className="hover:bg-slate-100 ">
        <td className="w-48 h-14">
          <div className="flex justify-around items-center px-3 py-2">
            <button
              className={` ${!viewDetail ? '' : 'rotate-180'} 
              duration-300 transition-all w-8 h-8 flex justify-center items-center bg-gray-900 rounded-lg`}
              onClick={toggleviewDetail}>
              <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                <AiFillCaretDown />
              </IconContext.Provider>
            </button>
            <button
              className="w-8 h-8  flex justify-center items-center bg-yellow-400 rounded-lg"
              onClick={() => {
                handleClickEdit(youtubeSubscription);
              }}>
              <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                <FaPencilAlt />
              </IconContext.Provider>
            </button>
            <button
              className="w-8 h-8  flex justify-center items-center bg-red-600 rounded-lg"
              onClick={() => {
                // handleClickDelete(tag);
              }}>
              <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                <FaTrashAlt />
              </IconContext.Provider>
            </button>
          </div>
        </td>
        <td className="w-30 h-14 ">
          <div className="flex justify-around items-center">
            <a
              href={`https://www.youtube.com/channel/${youtubeSubscription.channel_id}`}
              target="_blank"
              rel="noreferrer"
              className="hover:animate-spin cursor-pointer">
              <img
                src={youtubeSubscription.thumbnail_default}
                alt={`${youtubeSubscription.title} foto`}
                className="w-12 h-12 rounded-full"
              />
            </a>
          </div>
        </td>
        <td className="h-14 min-w-full">
          <div className="px-3 text-start text-lg text-gray-900 font-semibold">
            <p>{youtubeSubscription.title}</p>
          </div>
        </td>
        <td className="h-14 w-26">
          <div className="px-3 text-center text-lg text-gray-900 font-semibold">
            <p>{youtubeSubscription.published_at}</p>
          </div>
        </td>
        {/* <td className="max-h-14 max-w-xs">
        <div className="px-3 text-center text-lg text-gray-900 font-semibold">
          <p>{youtubeSubscription.description}</p>
        </div>
      </td> */}
      </tr>

      {/* Fila de Detalles 
      w-[${recourse.totalProgressPercentage}%]
      */}
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
                <IoMdPricetags />
              </IconContext.Provider>
              <p className="max-w-4xl">ETIQUETAS</p>
            </div>
            <div className="flex justify-between gap-4">
              {/* TODO Hacer scrollear las etiquetas */}
              <div className="flex flex-1 justify-start items-start flex-wrap gap-2 leading-1">
                {/* {recourse?.tags.map((tag) => (
              <div
                key={tag.id}
                className={`${tag.style} m-0 h-7 shrink px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase`}>
                {tag.name}
              </div> 
            ))}
            */}
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Row;
