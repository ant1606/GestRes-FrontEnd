import React, { useState } from 'react';
import { useWebPage } from '../../context/webPage.context';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '#/hooks/redux';
import { focusInput } from '#/utilities/manipulationDom';
// import { destroyWebPage, getWebPages } from '#/services/webPage.services';
import { IconContext } from 'react-icons';
import { FaPencilAlt, FaTrashAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import { IoMdPricetags } from 'react-icons/io';
import { MdDescription } from 'react-icons/md';

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
  const [viewDetail, setviewDetail] = useState(false);

  const handleClickEdit = (webPage: WebPage): void => {
    resetValidationError();
    selectedWebPage(webPage);
    focusInput('#name');
  };
  function toggleviewDetail(): void {
    setviewDetail(!viewDetail);
  }

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
    <>
      <tr>
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
          <div className="px-3 text-center flex justify-center items-center text-lg text-gray-900 font-semibold">
            <a href={webPage.url} target="_blank" rel="noreferrer">
              <button className="w-8 h-8  flex justify-center items-center bg-gray-900 rounded-lg">
                <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
                  <FaExternalLinkAlt />
                </IconContext.Provider>
              </button>
            </a>
          </div>
        </td>
        <td className="max-h-14 max-w-xs">
          <div className="flex justify-start items-center">
            <span
              className={`m-0 h-7 shrink px-4 py-1 text-sm font-bold rounded-2xl transform-uppercase`}>
              {webPage.name}
            </span>
          </div>
        </td>
        {/* <td className="max-h-14 max-w-xs">
        <div className="px-3 text-center text-lg text-gray-900 font-semibold">
          <p>{webPage.description}</p>
        </div>
      </td> */}
        <td className="max-h-14 max-w-xs">
          <div className="px-3 text-center text-lg text-gray-900 font-semibold">
            <p>{webPage.countVisits}</p>
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
                <MdDescription />
              </IconContext.Provider>
              <p className="max-w-4xl">DESCRIPCIÓN - {webPage.description}</p>
            </div>
            <div className="flex gap-4 pb-3 ">
              <IconContext.Provider value={{ size: '1.5em' }}>
                <IoMdPricetags />
              </IconContext.Provider>
              <p className="max-w-4xl">ETIQUETAS</p>
            </div>
            <div className="flex justify-between gap-4">
              {/* TODO Hacer scrollear las etiquetas */}
              <div className="flex flex-1 justify-start items-start flex-wrap gap-2 leading-1">
                {webPage?.tags.map((tag) => (
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
