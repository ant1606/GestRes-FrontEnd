import Loader from '#/components/Loader';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { changeTitle } from '#/redux/slice/uiSlice';
import { type RootState } from '#/redux/store';
import React, { useEffect } from 'react';
import Button from '#/components/Button';
import { resetOAuthGoogle } from '#/redux/slice/authenticationSlice';
import { getStatusProcess, getSubscriptions } from '#/services/subscriptions.services';

const clientId = '462247420719-77pia3qk05j3vu6u00blu0ev05u4pajr.apps.googleusercontent.com';

const SubscriptionView: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.loadingState);
  const dispatch = useAppDispatch();
  const { comeFromOAuthCallback, isOAuthAccess } = useAppSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    dispatch(changeTitle('Mantenimiento de Suscripciones de Youtube'));
    const initSubscription = async (): Promise<void> => {
      if (comeFromOAuthCallback) {
        if (isOAuthAccess) {
          console.log('Endpoint procesado y token', performance.now());
          console.log('Nos entrego token y procesar en backend');
          // Implementar consulta de subscriptions ya procesados
          pollProcessStatus();
        } else {
          console.log('Mostrar mensaje de error de acceso a goggle');
        }
        console.log('Resetenado store de oauth');
        dispatch(resetOAuthGoogle());
      }
      {
        // Mostrando registros ya existentes;
        const res = await getSubscriptions();
        console.log(res);
      }
    };
    initSubscription();
  }, []);

  const pollProcessStatus = async (): Promise<void> => {
    const response = await getStatusProcess();
    // console.log(response.message);
    if (response.message === 'procesando') {
      // El proceso aún está en curso, configura un temporizador y realiza otra solicitud después de cierto tiempo
      setTimeout(pollProcessStatus, 5000); // por ejemplo, espera 5 segundos antes de hacer la siguiente solicitud
    } else {
      // El proceso ha finalizado, ahora puedes hacer la consulta para obtener los datos
      const res = await getSubscriptions();
      console.log(res);
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
    console.log('Viendo el formulario de petición de consentimiento');
    console.log(params);
    console.log(form);
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  };

  const callApi = (): void => {
    const apiKey = 'AIzaSyA5bv7LZH0sdh4GFtq6rb7ayEFNun65sSc';
    const apiUrl = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet,contentDetails&mine=true&key=${apiKey}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenOAuth}`,
        Accept: 'application/json'
      }
    })
      .then(async (response) => await response.json())
      .then((data) => {
        console.log('llamando a api');
        console.log(data);
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
  };

  const logoutOAuth = (): void => {
    const apiUrl = `https://oauth2.googleapis.com/revoke?token=${tokenOAuth}`;
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(async (response) => await response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
  };

  return (
    <>
      {uiLoading && <Loader />}
      <p>Suscripciones de Youtube</p>
      <Button text="Brindar acceso" onClick={oauthSignIn} btnType="main" type="button" />
    </>
  );
};

export default SubscriptionView;
