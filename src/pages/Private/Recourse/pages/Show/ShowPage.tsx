import React, { useEffect, useState } from 'react';
import Form from '../../components/Form';
import { useRecourse } from '../../context/recourse.context';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { changeColorTitleBar, changeTitle } from '#/redux/slice/uiSlice';
import { StatusProvider } from '../../components/Status/context/status.context';
import StatusRecourse from '../../components/Status';
import { ProgressProvider } from '../../components/Progress/context/progress.context';
import ProgressRecourse from '../../components/Progress';
import { useParams } from 'react-router-dom';
import { getRecourse } from '#/services';
import { type RootState } from '#/redux/store';
import { useFetch } from '#/hooks/useFetch';
import { type RecourseErrorResponse, type RecourseSuccessResponse } from '../../index.types';
import { toastNotifications } from '#/utilities/notificationsSwal';

export const ShowPage: React.FC = () => {
  const { cleanSelectedRecourse, selectedRecourse, recourseActive } = useRecourse();
  const { settingsStatus } = useAppSelector((state: RootState) => state.settings);
  const [toggleTab, setToggleTab] = useState(1);
  const dispatch = useAppDispatch();
  const { idrecurso } = useParams();
  const { fetchWithSessionHandling, controller } = useFetch();

  // TODO ver como hacer de esto una funcion global o util para obtener el estilo

  useEffect(() => {
    const getRecourseData = async (): Promise<void> => {
      try {
        const idRecurso = parseInt(idrecurso as string);
        const response = await getRecourse(idRecurso, fetchWithSessionHandling);

        if (response.status === 'error') {
          const responseError = response as RecourseErrorResponse;

          // Mensaje de error general por parte del backend
          if (responseError.message !== '') {
            throw new Error(responseError.message);
          }
        } else {
          const responseSuccess = response as RecourseSuccessResponse;
          const styleStatus = settingsStatus.find(
            (val) => val.value === (responseSuccess.data as Recourse).currentStatusName
          )?.value2;
          dispatch(changeColorTitleBar(styleStatus === undefined ? null : styleStatus));
          dispatch(changeTitle((responseSuccess.data as Recourse).name));
          selectedRecourse(responseSuccess.data);
        }

        // const recourse = (await getRecourse(
        //   idRecurso,
        //   fetchWithSessionHandling
        // )) as RecourseSuccessResponse;
        // // TODO Hacer validación si se obtiene el recurso o si se obtiene error
        // const styleStatus = settingsStatus.find(
        //   (val) => val.value === (recourse.data as Recourse).currentStatusName
        // )?.value2;
        // dispatch(changeColorTitleBar(styleStatus === undefined ? null : styleStatus));
        // dispatch(changeTitle((recourse.data as Recourse).name));
        // selectedRecourse(recourse.data);
      } catch (error: any) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        toastNotifications().notificationError(error.message);
      }
    };

    getRecourseData();

    return () => {
      dispatch(changeColorTitleBar(null));
      cleanSelectedRecourse();
      // Abortando la petición al endpoint al momento de cambiar de página
      controller.abort();
    };
  }, []);

  return (
    <>
      {/* Tabs Header */}
      <div className="flex text-gray-900 font-semibold max-w-full">
        <button
          className={` 
          ${toggleTab === 1 ? 'text-white bg-gray-900 border-b-0' : ''}
          cursor-pointer grow border-2 text-center uppercase border-gray-900 py-3 px-10 `}
          onClick={() => {
            setToggleTab(1);
          }}>
          Detalles
        </button>
        <button
          className={` 
          ${toggleTab === 2 ? 'text-white bg-gray-900 border-b-0' : ''}
          cursor-pointer grow border-2 text-center uppercase border-gray-900 border-l-0 py-3 px-10`}
          onClick={() => {
            setToggleTab(2);
          }}>
          Estado
        </button>
        <button
          className={`
          ${toggleTab === 3 ? 'text-white bg-gray-900 border-b-0' : ''} 
          cursor-pointer grow border-2 text-center uppercase border-gray-900 border-l-0 py-3 px-10`}
          onClick={() => {
            setToggleTab(3);
          }}>
          Progreso
        </button>
      </div>
      {/* Fin Tabs Header */}

      {/* Tabs Content */}
      <div className="border-2  h-[32rem] border-gray-900 border-t-0 overflow-y-scroll px-8 py-5">
        <div className={`${toggleTab === 1 ? '' : 'hidden'}`}>
          <Form isShow={true} />
        </div>

        <div className={`${toggleTab === 2 ? '' : 'hidden'}`}>
          {recourseActive !== null && (
            <StatusProvider>
              <StatusRecourse />
            </StatusProvider>
          )}
        </div>

        <div className={`${toggleTab === 3 ? '' : 'hidden'}`}>
          <div>
            {recourseActive !== null && (
              <ProgressProvider>
                <ProgressRecourse />
              </ProgressProvider>
            )}
          </div>
        </div>
      </div>
      {/* Fin Tabs Content */}
    </>
  );
};
