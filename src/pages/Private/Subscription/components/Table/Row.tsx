import React, { useRef, useState } from 'react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { useAppDispatch } from '#/hooks/redux';
import { isLoading } from '#/redux/slice/uiSlice';
import { IconContext } from 'react-icons';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import {
  SubscriptionYoutubeProvider,
  useYoutubeSubscription
} from '../../context/subscription.context';
import { AiFillCaretDown } from 'react-icons/ai';
import { IoMdPricetags } from 'react-icons/io';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Form from '../Form/Form';
import { destroySubscription, getSubscriptions } from '#/services/subscriptions.services';
import { type YoutubeSubscriptionErrorResponse } from '../../index.types';
import { useFetch } from '#/hooks/useFetch';

interface Prop {
  youtubeSubscription: YoutubeSubscription;
}
const Row: React.FC<Prop> = ({ youtubeSubscription }) => {
  const [viewDetail, setviewDetail] = useState(false);
  const MySwal = withReactContent(Swal);
  const modalRef = useRef(MySwal);
  const [searchParams] = useSearchParams();
  const { fetchWithSessionHandling } = useFetch();

  function toggleviewDetail(): void {
    setviewDetail(!viewDetail);
  }
  const { resetValidationError, cleanSelectedYoutubeSubscription, setYoutubeSubscriptions } =
    useYoutubeSubscription();

  const dispatch = useAppDispatch();

  const handleClickDelete = async (youtubeSubscription: YoutubeSubscription): Promise<void> => {
    try {
      const result = await toastNotifications().modalDeleteConfirm(youtubeSubscription.title);
      if (!result) return;

      dispatch(isLoading(true));
      const response = await destroySubscription(youtubeSubscription, fetchWithSessionHandling);

      if (response.status === 'error') {
        const responseError = response as YoutubeSubscriptionErrorResponse;

        // Mensaje de error general por parte del backend
        if (responseError.message !== '') {
          throw new Error(responseError.message);
        }
      } else {
        resetValidationError();
        toastNotifications().toastSuccesCustomize(
          `Se elimino la suscripción ${youtubeSubscription.title} satisfactoriamente`
        );
        cleanSelectedYoutubeSubscription();
        const subscriptions = await getSubscriptions(
          searchParams.toString(),
          fetchWithSessionHandling
        );
        setYoutubeSubscriptions(subscriptions);
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

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
              fetchWithSessionHandling={fetchWithSessionHandling}
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
    const youtubeSubscriptions = await getSubscriptions(
      searchParams.toString(),
      fetchWithSessionHandling
    );
    setYoutubeSubscriptions(youtubeSubscriptions);
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
                handleClickDelete(youtubeSubscription);
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
              href={`https://www.youtube.com/channel/${youtubeSubscription.channelId}`}
              target="_blank"
              rel="noreferrer"
              className="hover:animate-spin cursor-pointer">
              <img
                src={youtubeSubscription.thumbnailDefault}
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
            <p>{youtubeSubscription.publishedAt}</p>
          </div>
        </td>
      </tr>

      {/* Fila de Detalles */}
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
                {youtubeSubscription?.tags.map((tag) => (
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
