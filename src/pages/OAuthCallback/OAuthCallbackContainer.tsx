import AuthenticationTemplate from '#/components/AuthenticationTemplate';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { userAccessOAuthGoogle } from '#/redux/slice/authenticationSlice';
import { type RootState } from '#/redux/store';
import { importSubscriptions } from '#/services/subscriptions.services';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const OAuthCallbackContainer: React.FC = () => {
  const orderSortApiYoutube = useAppSelector(
    (state: RootState) => state.authentication.orderSortApiYoutube
  ) as string;
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.hash.split('#')[1]);
    dispatch(userAccessOAuthGoogle(!params.has('error')));
    if (!params.has('error')) {
      // Access token generado por autentificación satisfactoria de OAuth de Google
      const accessToken = params.get('access_token') ?? '';
      // TODO Al momento de redireccionar correctamente a suscriptionView, mostrar un mensaje que se cargaron los datos
      // Y mostrar un loading o skeleton que muestre que se estarán cargando los datos en la tabla
      importSubscriptions(accessToken, orderSortApiYoutube);
    }
    // console.log('Navegando a subscription');
    navigate('/app/subscription');
  }, []);

  return (
    <AuthenticationTemplate>
      <div>OAuthCallbackContainer</div>
    </AuthenticationTemplate>
  );
};
