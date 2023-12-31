import React from 'react';
import { useWebPage } from '../../context/webPage.context';
import { useSearchParams } from 'react-router-dom';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { useAppDispatch } from '#/hooks/redux';
import { isLoading } from '#/redux/slice/uiSlice';
import { focusInput } from '#/utilities/manipulationDom';
// import { destroyWebPage, getWebPages } from '#/services/webPage.services';
import { IconContext } from 'react-icons';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

interface Prop {
  webPage: WebPage;
}

const Row: React.FC<Prop> = ({ webPage }) => {
  const {
    selectedWebPage,
    resetValidationError,
    cleanSelectedWebPage,
    setWebPages,
    addValidationError
  } = useWebPage();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleClickEdit = (webPage: WebPage): void => {
    resetValidationError();
    selectedWebPage(webPage);
    focusInput('#name');
  };

  const handleClickDelete = async (webPage: WebPage): Promise<void> => {
    // try {
    //   const result = await toastNotifications().modalDeleteConfirm(webPage.name);
    //   if (!result) return;
    //   dispatch(isLoading(true));
    //   const response = await destroyWebPage(webPage);
    //   if ('data' in response) {
    //     resetValidationError();
    //     toastNotifications().toastSuccesCustomize(
    //       `Se elimino la etiqueta ${webPage.name} satisfactoriamente`
    //     );
    //     cleanSelectedWebPage();
    //     const webPages = await getWebPages(searchParams.toString());
    //     setWebPages(webPages);
    //   } else if ('error' in response) {
    //     const errorsDetail = response.error?.detail;
    //     Object.keys(errorsDetail).forEach((key) => {
    //       if (key !== 'apiResponseMessageError') {
    //         addValidationError({ [key]: errorsDetail[key] });
    //       }
    //     });
    //     if ('apiResponseMessageError' in errorsDetail) {
    //       if (errorsDetail.apiResponseMessageError !== null)
    //         throw new Error(errorsDetail.apiResponseMessageError);
    //     }
    //   }
    // } catch (error: any) {
    //   toastNotifications().notificationError(error.message);
    // } finally {
    //   dispatch(isLoading(false));
    // }
  };

  return (
    <tr>
      <td className="w-48 h-14">
        <div className="flex justify-around items-center px-3 py-2">
          <button
            className="w-8 h-8  flex justify-center items-center bg-yellow-400 rounded-lg"
            onClick={() => {
              handleClickEdit(webPage);
            }}>
            <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
              <FaPencilAlt />
            </IconContext.Provider>
          </button>
          <button
            className="w-8 h-8  flex justify-center items-center bg-red-600 rounded-lg"
            onClick={() => {
              handleClickDelete(webPage);
            }}>
            <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
              <FaTrashAlt />
            </IconContext.Provider>
          </button>
        </div>
      </td>
      <td className="max-h-14 max-w-xs">
        <div className="flex justify-center items-center">
          <span
            className={`m-0 h-7 shrink px-4 py-1 text-sm font-bold rounded-2xl transform-uppercase`}>
            {webPage.name}
          </span>
        </div>
      </td>
      <td className="max-h-14 max-w-xs">
        <div className="px-3 text-center text-lg text-gray-900 font-semibold">
          <p>{webPage.url}</p>
        </div>
      </td>
      <td className="max-h-14 max-w-xs">
        <div className="px-3 text-center text-lg text-gray-900 font-semibold">
          <p>{webPage.description}</p>
        </div>
      </td>
      <td className="max-h-14 max-w-xs">
        <div className="px-3 text-center text-lg text-gray-900 font-semibold">
          <p>{webPage.countVisits}</p>
        </div>
      </td>
    </tr>
  );
};

export default Row;
