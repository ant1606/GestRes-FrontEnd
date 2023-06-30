import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoading } from '@/redux/slice/uiSlice.js';
import { useAppDispatch } from '@/hooks/redux/index.js';
import { useForm } from '@/hooks/useForm.js';

import {
  validateUserEmail,
  type User,
  type ValidationMessage,
  validateUserPassword
} from './LoginFormValidationInputs.js';
import { useLogin } from './context/login.context.js';
import { logginUser } from '@/services/login.services.js';
import { processErorrResponse } from '@/utilities/processAPIResponse.util.js';
import { toastNotifications } from '@/utilities/notificationsSwal.js';
import { setCookie } from '@/utilities/manageCookies.js';
import LoginFormView from './LoginFormView.js';

type ValidationFunctions = Record<string, (values: User) => ValidationMessage>;
interface ResponseAPI {
  data?: Record<string, any>;
  error?: Record<string, any>;
}
const validateFunctionsFormInputs: ValidationFunctions = {
  email: validateUserEmail,
  password: validateUserPassword
};

const initialValue = {
  email: '',
  password: ''
};

const LoginFormContainer: React.FC = () => {
  const { loginError, addValidationError } = useLogin();
  const {
    values: formValues,
    handleInputChange,
    validatedSubmitForm
  } = useForm(
    initialValue,
    validateFunctionsFormInputs as Record<string, (values: unknown) => string | null>,
    addValidationError
  );
  const { email, password } = formValues;

  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const loginErrorRef = useRef<Record<string, string | null>>({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    loginErrorRef.current = loginError;
  }, [loginError]);

  const handleCheckBoxClick = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(evt.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      dispatch(isLoading(true));
      await validatedSubmitForm();
      const existValidationMessage = Object.keys(loginErrorRef.current).every(
        (el) => loginErrorRef.current[el] === null
      );
      if (existValidationMessage) {
        const response: ResponseAPI = await logginUser({
          email,
          password,
          remember_me: rememberMe
        });

        if ('data' in response) {
          // TODO Se almacenará el bearerToken en cookie y los datos del usuario en el localStorage y luego lo gestionare en el store
          // El cookie es porque permite manejar fecha de expiración
          // Pero queda pendiente implementar JWT para obtener los datos del usuario en un token encriptado
          setCookie('bearerToken', response.data?.bearer_token, response.data?.bearer_expire);
          localStorage.setItem('rememberToken', response.data?.user.remember_token);
          const userInfo = response.data?.user;
          localStorage.setItem('user', JSON.stringify(userInfo));

          // TODO Ver si es buena opcion Almacenar datos del usuario en store en redux
          userInfo.is_verified === true ? navigate('/dashboard') : navigate('/notifyVerifyEmail');
        } else if ('error' in response) {
          const errorProcesed = processErorrResponse(response.error?.detail);
          Object.keys(errorProcesed).forEach((key) => {
            // TODO colocar el nombre api_response de manera global en una constante o cambiar nombre
            if (key !== 'api_response') {
              addValidationError({ [key]: errorProcesed[key] });
            }
          });

          if ('api_response' in errorProcesed) {
            throw new Error(errorProcesed.api_response);
          }
        }
      }
    } catch (error) {
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit(e); // Invocar la función handleSubmit sin esperar la promesa
  };

  return (
    <LoginFormView
      email={email}
      handleCheckBoxClick={handleCheckBoxClick}
      handleInput={handleInputChange}
      handleSubmit={handleSubmitWrapper}
      loginError={loginError}
      password={password}
      rememberMe={rememberMe}
    />
  );
};

export default LoginFormContainer;
