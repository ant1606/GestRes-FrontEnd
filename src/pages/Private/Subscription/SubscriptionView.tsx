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
import { useFetch } from '#/hooks/useFetch';
import Dropdown from './components/Dropdown/Dropdown';
import TableSkeleton from '#/components/Skeleton/TableSkeleton';

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
    setYoutubeSubscriptionPerPage,
    youtubeSubscriptionSearchLoading,
    setYoutubeSubscriptionSearchLoading
  } = useYoutubeSubscription();
  const [searchParams, setSearchParams] = useSearchParams();
  const { comeFromOAuthCallback, isOAuthAccess } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const { fetchWithSessionHandling } = useFetch();
  const dropDownOptions = [
    {
      name: 'Alfabético',
      action: (option) => {
        dispatch(userSelectOrderSortApiYoutube('alphabetical'));
        oauthSignIn();
      }
    },
    {
      name: 'Relevante',
      action: (option) => {
        dispatch(userSelectOrderSortApiYoutube('relevance'));
        oauthSignIn();
      }
    },
    {
      name: 'Actividad',
      action: (option) => {
        dispatch(userSelectOrderSortApiYoutube('unread'));
        oauthSignIn();
      }
    }
  ];

  useEffect(() => {
    setYoutubeSubscriptionPerPage(perPageItemsValue[0].id);
    dispatch(changeTitle('Mantenimiento de Suscripciones de Youtube'));
  }, []);

  useEffect(() => {
    const initSubscription = async (): Promise<void> => {
      if (comeFromOAuthCallback as boolean) {
        if (isOAuthAccess as boolean) {
          // pollProcessStatus();
          toastNotifications().toastSuccesCustomize('Estamos procesando tus canales suscritos...');
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
    setYoutubeSubscriptionSearchLoading(true);
    searchParams.delete('page');
    searchParams.append('page', (e.selected + 1).toString());
    searchParams.delete('perPage');
    searchParams.append('perPage', youtubeSubscriptionPerPage);
    searchParams.sort();
    setSearchParams(searchParams);
    const responseYoutubeSubscriptions = (await getSubscriptions(
      searchParams.toString(),
      fetchWithSessionHandling
    )) as YoutubeSubscriptionsPaginatedSuccessResponse;
    setYoutubeSubscriptionSearchLoading(false);
    setYoutubeSubscriptions(responseYoutubeSubscriptions);
  };

  const handlePageChangeWrapper = (e: ReactPaginaOnPageChangeArgument): void => {
    handlePageChange(e);
  };

  return (
    <>
      {uiLoading && <Loader />}
      <div className="flex justify-between gap-10">
        <Dropdown options={dropDownOptions} />
      </div>
      <Filter />
      {(youtubeSubscriptionSearchLoading as boolean) ? (
        <TableSkeleton />
      ) : youtubeSubscriptions.length === 0 ? (
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
