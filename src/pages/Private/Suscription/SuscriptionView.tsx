import Loader from '#/components/Loader';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { changeTitle } from '#/redux/slice/uiSlice';
import { type RootState } from '#/redux/store';
import React, { useEffect, useState } from 'react';
import Button from '#/components/Button';

const scopeAccess = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube'
];
const clientId = '462247420719-77pia3qk05j3vu6u00blu0ev05u4pajr.apps.googleusercontent.com';

const SuscriptionView: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.loadingState);
  const dispatch = useAppDispatch();
  const [tokenOAuth, setTokenOAuth] = useState<string>('');

  useEffect(() => {
    dispatch(changeTitle('Mantenimiento de Suscripciones de Youtube'));
    console.log('Renderizando....');
  }, []);

  useEffect(() => {
    console.log('Renderizando.... tokenOAuth');
    if (tokenOAuth === '') {
      return;
    }
    callApi();
    logoutOAuth();
    setTokenOAuth('');
  }, [tokenOAuth]);

  const oauthSignInModal = (): void => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Parameters to pass to OAuth 2.0 endpoint.
    const params = {
      client_id: clientId,
      redirect_uri: 'http://localhost:5173',
      response_type: 'token',
      scope: scopeAccess[0],
      include_granted_scopes: 'true',
      state: 'pass-through value'
    };

    // Construct the URL with query parameters
    const urlParams = new URLSearchParams(params);
    const url = `${oauth2Endpoint}?${urlParams.toString()}`;

    // Open a new window
    const newWindow = window.open(url, '_blank', 'width=600,height=600');
    let isBeforeUnloadHandled = false;
    // Optional: Attach an event listener to handle the closing of the new window
    if (newWindow != null) {
      console.log('Se abrio modal para autorización');
      newWindow.addEventListener('beforeunload', (event) => {
        // Handle the closing of the new window, if needed
        // You can access the event and retrieve data from the window here
        if (!isBeforeUnloadHandled) {
          isBeforeUnloadHandled = true;
          console.log('desde Evento beforeunload');
          const uriResponseOAuth = event.target.documentURI;
          console.log(uriResponseOAuth);
          const params = new URLSearchParams(uriResponseOAuth.split('#')[1]);
          // for (const key of params.keys()) {
          //   console.log(key);
          // }
          // console.log(params.get('access_token'));

          console.log(params.get('expires_in'));
          const accessToken = params.get('access_token') as string;
          setTokenOAuth(accessToken);
        }
      });

      // Event listener para recibir mensajes de la ventana secundaria
      newWindow.addEventListener('message', (event) => {
        // Verificar el origen del mensaje si es necesario
        // event.origin === 'https://charming-monitor-unlikely.ngrok-free.app'

        // Obtener datos del mensaje
        console.log('Desde message');
        const data = event.data;
        console.log('Datos recibidos:', data);
        // if (event.data && event.data.token) {
        //   console.log('Datos recibidos:', event.data);
        //   setTokenOAuth(event.data.token);
        //   // Cierra la ventana secundaria si es necesario
        //   newWindow.close();
        // }
        // Cerrar la ventana secundaria si es necesario
        if (event.source != null) {
          event.source.close();
        }
      });
    }
  };

  const callApi = (): void => {
    // const accessToken =
    //   'ya29.a0AfB_byA6Z6s0GbMIjgh8jUJlzkYf5JFMHB9JH-_us0mTMIy_8XhgsVHTZ3MMhi9vcup7-Qr9jxh8a-poSfpuuc8MLrX-fFx4DamBTSbvIYlqb-0wrRXib6qsWo36QazeCYu8U9lELSffOM9NVIeyAlC-GnvU3Mr2fD4aCgYKAXQSARMSFQHGX2MiAxm_D_RsdP_hnXXM1maIuQ0170';
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
      <Button text="Brindar acceso" onClick={oauthSignInModal} btnType="main" type="button" />
    </>
  );
};

export default SuscriptionView;
