import Loader from '#/components/Loader';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { changeTitle } from '#/redux/slice/uiSlice';
import { type RootState } from '#/redux/store';
import React, { useEffect } from 'react';
import Button from '#/components/Button';
import { resetOAuthGoogle } from '#/redux/slice/authenticationSlice';
import { getStatusProcess, getSubscriptions } from '#/services/subscriptions.services';
import { useYoutubeSubscription } from './context/subscription.context';
import { useSearchParams } from 'react-router-dom';
import Table from './components/Table';
import FooterTable from '#/components/FooterTable';
import perPageItemsValue from '#/config/perPageItemsValue';
import Filter from './components/Filter';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { oauthSignIn } from './utils/helpers';

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
      if (comeFromOAuthCallback) {
        if (isOAuthAccess) {
          pollProcessStatus();
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

  const pollProcessStatus = async (): Promise<void> => {
    const response = await getStatusProcess();
    if (response.message === 'procesando') {
      setTimeout(() => {
        pollProcessStatus();
      }, 5000);
    } else {
      const res = await getSubscriptions('');
      setYoutubeSubscriptions(res);
    }
  };

  const handlePageChange = async (e: ReactPaginaOnPageChangeArgument): Promise<void> => {
    searchParams.delete('page');
    searchParams.append('page', (e.selected + 1).toString());
    searchParams.delete('perPage');
    searchParams.append('perPage', youtubeSubscriptionPerPage);
    searchParams.sort();
    setSearchParams(searchParams);
    const youtubeSubscriptions = await getSubscriptions(searchParams.toString());
    setYoutubeSubscriptions(youtubeSubscriptions);
  };

  const handlePageChangeWrapper = (e: ReactPaginaOnPageChangeArgument): void => {
    handlePageChange(e);
  };

  return (
    <>
      {uiLoading && <Loader />}
      <Button text="Importar desde Google" onClick={oauthSignIn} btnType="default" type="button" />
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
