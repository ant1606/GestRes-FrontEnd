import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoading } from '#/redux/slice/uiSlice.js';
import { useAppDispatch } from '#/hooks/redux/index.js';
import { useForm } from '#/hooks/useForm.js';

import { validateUserEmail, validateUserPassword } from '../utils/validationInputs.js';
import { useLogin } from '../context/login.context.js';
import { logginUser } from '#/services/login.services.js';
import { toastNotifications } from '#/utilities/notificationsSwal.js';
import FormView from './FormView.js';
import { userIsLoggin } from '#/redux/slice/authenticationSlice.js';
import { savePersistenDataUser } from '#/utilities/authenticationManagement.js';
import { type LoginSuccessResponse, type LoginErrorResponse } from '../index.types.js';

const validateFunctionsFormInputs = {
  email: validateUserEmail,
  password: validateUserPassword
};

const initialValue = {
  email: '',
  password: ''
};

const FormContainer: React.FC = () => {
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

  const userIsLoggedInPromise = async (params: User): Promise<void> => {
    await new Promise<void>((resolve) => {
      dispatch(
        userIsLoggin({
          email: params.email,
          id: parseInt(params.id),
          isVerified: params.isVerified,
          name: params.name
        })
      );
      resolve();
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      dispatch(isLoading(true));
      await validatedSubmitForm();
      const existValidationMessage = Object.values(loginErrorRef.current).every(
        (el) => el === null
      );
      if (existValidationMessage) {
        const response = await logginUser({
          email,
          password,
          remember_me: rememberMe
        });

        if (response.status === 'error') {
          const responseError = response as LoginErrorResponse;
          // Errores de validación de campos por parte del backend
          const inputsValidationFromBackend = responseError.details;
          Object.keys(inputsValidationFromBackend).forEach((key) => {
            addValidationError({ [key]: inputsValidationFromBackend[key] });
          });

          // Mensaje de error general por parte del backend
          if (responseError.message !== '') {
            throw new Error(responseError.message);
          }
        } else {
          const responseSuccess = response as LoginSuccessResponse;
          responseSuccess.data.user.rememberToken = rememberMe
            ? responseSuccess.data.user.rememberToken
            : null;
          savePersistenDataUser(responseSuccess.data);
          await userIsLoggedInPromise(responseSuccess.data.user);
          navigate('/app/dashboard', { replace: true });
        }
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <FormView
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
export default FormContainer;
