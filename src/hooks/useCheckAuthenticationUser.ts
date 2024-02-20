import { userIsLoggin } from '#/redux/slice/authenticationSlice';
import { checkAuthentication } from '#/utilities/authenticationManagement';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './redux';

export const useCheckAuthenticationUser = (): any => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // TODO IMplementar useFetch en este apartado
  const checkedUserLoggin = async (): Promise<void> => {
    await checkAuthentication()
      .then((res) => {
        userIsLoggedInPromise(res);
      })
      .catch((error) => {
        // TODO MOstarr notificación de error de usuario no autentificado
        console.log('error', error);
        navigate('/login', { replace: true });
      });
  };

  const userIsLoggedInPromise = async (params: UserLoginParams): Promise<void> => {
    // Actualizando estado global del usuario autentificado
    await new Promise<void>((resolve) => {
      dispatch(
        userIsLoggin({
          email: params.email,
          id: params.id,
          isVerified: params.isVerified,
          name: params.name
        })
      );
      resolve();
    });
  };

  return { checkedUserLoggin };
};
