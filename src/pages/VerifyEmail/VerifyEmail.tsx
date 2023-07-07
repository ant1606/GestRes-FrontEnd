import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useSecurity } from '../../Context/SecurityContext.js';
import AuthenticationTemplate from '../../components/AuthenticationTemplate.js';
import { useAppDispatch } from '@/hooks/redux/index.js';
import { isLoading } from '@/redux/slice/uiSlice.js';
import { userIsLoggin } from '@/redux/slice/authenticationSlice.js';
import Cookies from 'js-cookie';
import { verifyUserEmail } from '@/services/verifyEmail.services.js';
import { toastNotifications } from '@/utilities/notificationsSwal.js';

export const VerifyEmail: React.FC = () => {
  const { id, hash } = useParams();
  // const { verifyUserEmail } = useSecurity();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async (): Promise<void> => {
    try {
      dispatch(isLoading(true));

      if (typeof id !== 'string') throw new Error('No se identifico al usuario');
      if (typeof hash !== 'string') throw new Error('No se identifico al usuario');

      const response = await verifyUserEmail(id, hash);
      console.log(response);
      if ('data' in response) {
        Cookies.set('bearerToken', response.data?.bearerToken, { expires: 1 });
        localStorage.setItem('rememberToken', response.data?.user.rememberToken);
        const userInfo = response.data?.user;
        localStorage.setItem('user', JSON.stringify(userInfo));

        console.log('antes de hacer el dispatch');
        dispatch(
          userIsLoggin({
            email: userInfo.email,
            id: userInfo.id,
            isVerified: userInfo.isVerified,
            name: userInfo.name
          })
        );
        navigate('/app/dashboard', { replace: true });
      } else if ('error' in response) {
        const errorsDetail = response.error?.detail;

        if ('apiResponse' in errorsDetail) {
          throw new Error(errorsDetail.apiResponse);
        }
      }
    } catch (error) {
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  return (
    <>
      <AuthenticationTemplate>
        <p className="text-5xl leading-10 font-bold text-center">
          Estamos verificando tu correo electrónico ...
        </p>
      </AuthenticationTemplate>
    </>
  );
};
