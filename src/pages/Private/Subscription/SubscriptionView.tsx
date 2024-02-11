import Loader from '#/components/Loader';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { changeTitle } from '#/redux/slice/uiSlice';
import { type RootState } from '#/redux/store';
import React, { useEffect } from 'react';
import Button from '#/components/Button';
import { resetOAuthGoogle, userSelectOrderSortApiYoutube } from '#/redux/slice/authenticationSlice';
import { getSubscriptions } from '#/services/subscriptions.services';
import { useYoutubeSubscription } from './context/subscription.context';
import { useSearchParams } from 'react-router-dom';
import Table from './components/Table';
import FooterTable from '#/components/FooterTable';
import perPageItemsValue from '#/config/perPageItemsValue';
import Filter from './components/Filter';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { oauthSignIn } from './utils/helpers';
import { type YoutubeSubscriptionsPaginatedSuccessResponse } from './index.types';

interface ReactPaginaOnPageChangeArgument {
  selected: number;
}

const SubscriptionView: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.loadingState);
  const dispatch = useAppDispatch();
  const {
    youtubeSubscriptions,
    youtubeSubscriptionMeta,
    setYoutubeSubscriptions,
    youtubeSubscriptionPerPage,
    setYoutubeSubscriptionPerPage
  } = useYoutubeSubscription();
  const [searchParams, setSearchParams] = useSearchParams();
  const { comeFromOAuthCallback, isOAuthAccess } = useAppSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    setYoutubeSubscriptionPerPage(perPageItemsValue[0].id);
    dispatch(changeTitle('Mantenimiento de Suscripciones de Youtube'));
  }, []);

  useEffect(() => {
    const initSubscription = async (): Promise<void> => {
      if (comeFromOAuthCallback as boolean) {
        if (isOAuthAccess as boolean) {
          // TODO MOstrar un mensaje o toast de que se estan importando los canales mientras el resultado de la funcion sea "procesando"
          // pollProcessStatus();
        } else {
          toastNotifications().toastErrorCustomize(
            'Operación Cancelada: Autorización denegada por el usuario'
          );
        }
        dispatch(resetOAuthGoogle());
      }
    };

    initSubscription();
  }, [comeFromOAuthCallback]);

  // const pollProcessStatus = async (): Promise<void> => {
  //   const response = (await getStatusProcess()) as { message: string };
  //   if (response.message === 'procesando') {
  //     setTimeout(() => {
  //       pollProcessStatus();
  //     }, 5000);
  //   } else {
  //     const responseData = (await getSubscriptions(
  //       searchParams.toString()
  //     )) as YoutubeSubscriptionsPaginatedSuccessResponse;
  //     setYoutubeSubscriptions(responseData);
  //   }
  // };

  const handlePageChange = async (e: ReactPaginaOnPageChangeArgument): Promise<void> => {
    searchParams.delete('page');
    searchParams.append('page', (e.selected + 1).toString());
    searchParams.delete('perPage');
    searchParams.append('perPage', youtubeSubscriptionPerPage);
    searchParams.sort();
    setSearchParams(searchParams);
    const responseYoutubeSubscriptions = (await getSubscriptions(
      searchParams.toString()
    )) as YoutubeSubscriptionsPaginatedSuccessResponse;
    setYoutubeSubscriptions(responseYoutubeSubscriptions);
  };

  const handlePageChangeWrapper = (e: ReactPaginaOnPageChangeArgument): void => {
    handlePageChange(e);
  };

  return (
    <>
      {uiLoading && <Loader />}
      <div className="flex justify-between gap-10">
        <Button
          text="Importar de Google - Alfabético"
          onClick={() => {
            dispatch(userSelectOrderSortApiYoutube('alphabetical'));
            oauthSignIn();
          }}
          btnType="default"
          type="button"
          classButton="text-lg px-2"
        />
        <Button
          text="Importar de Google - Relevante"
          onClick={() => {
            dispatch(userSelectOrderSortApiYoutube('relevance'));
            oauthSignIn();
          }}
          btnType="main"
          type="button"
          classButton="text-lg px-2"
        />
        <Button
          text="Importar de Google - Actividad"
          onClick={() => {
            dispatch(userSelectOrderSortApiYoutube('unread'));
            oauthSignIn();
          }}
          btnType="warning"
          type="button"
          classButton="text-lg px-2 text-gray-900"
        />
      </div>
      <Filter />
      {youtubeSubscriptions.length === 0 ? (
        <p>No se encontraron resultados</p>
      ) : (
        <>
          <Table />
          {youtubeSubscriptionMeta !== null && (
            <FooterTable handlePageChange={handlePageChangeWrapper} {...youtubeSubscriptionMeta} />
          )}
        </>
      )}
    </>
  );
};

export default SubscriptionView;
