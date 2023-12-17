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

const clientId = '462247420719-77pia3qk05j3vu6u00blu0ev05u4pajr.apps.googleusercontent.com';

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
          // Implementar consulta de subscriptions ya procesados
          pollProcessStatus();
        } else {
          toastNotifications().toastErrorCustomize(
            'Operación Cancelada: Autorización denegada por el usuario'
          );
        }
        console.log('Resetenado store de oauth');
        dispatch(resetOAuthGoogle());
      }
    };

    initSubscription();
  }, [comeFromOAuthCallback]);

  const pollProcessStatus = async (): Promise<void> => {
    const response = await getStatusProcess();
    // console.log(response.message);
    if (response.message === 'procesando') {
      // El proceso aún está en curso, configura un temporizador y realiza otra solicitud después de cierto tiempo
      setTimeout(() => {
        pollProcessStatus();
      }, 5000); // por ejemplo, espera 5 segundos antes de hacer la siguiente solicitud
    } else {
      // El proceso ha finalizado, ahora puedes hacer la consulta para obtener los datos
      const res = await getSubscriptions('');
      setYoutubeSubscriptions(res);
    }
  };

  const oauthSignIn = (): void => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Parameters to pass to OAuth 2.0 endpoint.
    const params = {
      client_id: clientId,
      redirect_uri: 'http://localhost:5173/oauthcallback',
      response_type: 'token',
      scope: 'https://www.googleapis.com/auth/youtube.readonly',
      include_granted_scopes: 'true',
      state: 'pass-through value'
    };

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    const form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    for (const p in params) {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
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
      <Button text="Brindar acceso" onClick={oauthSignIn} btnType="main" type="button" />
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
