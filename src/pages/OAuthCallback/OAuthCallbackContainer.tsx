import AuthenticationTemplate from '#/components/AuthenticationTemplate';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { userAccessOAuthGoogle } from '#/redux/slice/authenticationSlice';
import { type RootState } from '#/redux/store';
import { savingSubscriptions } from '#/services/subscriptions.services';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const OAuthCallbackContainer: React.FC = () => {
  const orderSortApiYoutube = useAppSelector(
    (state: RootState) => state.authentication.orderSortApiYoutube
  );
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.hash.split('#')[1]);
    dispatch(userAccessOAuthGoogle(!params.has('error')));
    if (!params.has('error')) {
      console.log('Comunicar conel enpodint');
      const accessToken = params.get('access_token') ?? '';
      console.log('Iniciamos llamada a endpoint', performance.now());
      // TODO Existe un problema que al momento de llamar al endpoint, existe una demora en la redirección
      // El flujo de alguna forma esta haciendo que al momento de llamar a authGuard se demore más de 10 segundos en redireccionar
      // Ver resultados del loggin abajo
      console.log('Porbando el state global', orderSortApiYoutube);
      savingSubscriptions(accessToken, orderSortApiYoutube);
      console.log('Finalizo llamada a endpoint', performance.now());
    }
    console.log('Navegando a subscription');
    navigate('/app/subscription');
  }, []);

  return (
    <AuthenticationTemplate>
      <div>OAuthCallbackContainer</div>
    </AuthenticationTemplate>
  );
};

/*
1er debugging
  Comunicar conel enpodint
OAuthCallbackContainer.tsx:19     ---------------    Iniciamos llamada a endpoint 1587.0999999996275
subscriptions.services.ts:6     ---------------    iniciando fetch con token ya29.a0AfB_byBqHIxb9cSDVpxtVH4tqbxdqDrZVovA-pIrT5hKmFnCEmia8-0qHRmwKCXbN3QO_k0cvK9rXqx3sCthiJaAby42C2HF264FJ9o_YaVu1DoRQYJvKBJ7xEICp4rNQBAbFM0ZEhCTC0uW3OiCOqWqm-qkaHW_TQaCgYKAVISARMSFQHGX2MiefXiihf30XkKEcfYtx0jBQ0169}
subscriptions.services.ts:17    ---------------     finalizando consumo
OAuthCallbackContainer.tsx:24     ---------------    Finalizo llamada a endpoint 1588.800000000745
OAuthCallbackContainer.tsx:26     ---------------    Navegando a subscription
AppRouter.tsx:68    ---------------     Entramos a initApp AppRouter 1591.4000000003725
auth.guard.tsx:50     ---------------    Pasamos por AuthGuard 1609.699999999255
auth.guard.tsx:50     ---------------    Pasamos por AuthGuard 11027.599999999627
SubscriptionView.tsx:22     ---------------    Endpoint procesado y token 11086.099999999627
SubscriptionView.tsx:23     ---------------    Nos entrego token y procesar en backend
SubscriptionView.tsx:27     ---------------    Resetenado store de oauth
auth.guard.tsx:50     ---------------    Pasamos por AuthGuard 11089.099999999627

 */

/*
Parece que exist eun problema en el initApp ya que antes de finalizar el proceso de initApp en AppRouter, se va a AuthGuard hasta que termine
initApp y nuevamente regresa a AuthGuard.

2do debugging
Comunicar conel enpodint
OAuthCallbackContainer.tsx:19---------------- Iniciamos llamada a endpoint 1321.7000000011176
subscriptions.services.ts:6---------------- iniciando fetch con token ya29.a0AfB_byCIj1UkHaASin_QelDn-gO4zDaf3LREUfeyWIP7L3OEB26yU46GfRLw19Ym0KNsZD529c33MEbn9SPy8nkB_UTuQM1BspT914aSxvfaVusiM4zxeE4Ht43dKXlyNZNu3FGFZF0rk0brcTFWOiSK6uR3KfJBuQaCgYKAVISARMSFQHGX2MitoqG2xP3E7iWV8f12mw_rQ0169}
subscriptions.services.ts:17---------------- finalizando consumo
OAuthCallbackContainer.tsx:24---------------- Finalizo llamada a endpoint 1326.5
OAuthCallbackContainer.tsx:26---------------- Navegando a subscription
AppRouter.tsx:68---------------- Entramos a initApp AppRouter 1329.4000000003725
AppRouter.tsx:72---------------- Hacemos fetch de settings y authentication 1329.5
auth.guard.tsx:50---------------- Pasamos por AuthGuard 1340.1000000014901
auth.guard.tsx:52---------------- Luego de obtener el userLoggin 1340.5
AppRouter.tsx:79---------------- Finalizmaos fetch en AppRouter initiApp y redirijimos la aplicación 9869.300000000745
auth.guard.tsx:50---------------- Pasamos por AuthGuard 9872.800000000745
auth.guard.tsx:52---------------- Luego de obtener el userLoggin 9873.300000000745
SubscriptionView.tsx:22---------------- Endpoint procesado y token 9909.700000001118
SubscriptionView.tsx:23---------------- Nos entrego token y procesar en backend
SubscriptionView.tsx:27---------------- Resetenado store de oauth
auth.guard.tsx:50---------------- Pasamos por AuthGuard 9918.60000000149
auth.guard.tsx:52---------------- Luego de obtener el userLoggin 9919.10000000149
*/
