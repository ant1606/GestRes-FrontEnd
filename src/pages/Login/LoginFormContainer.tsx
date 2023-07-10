import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoading } from '@/redux/slice/uiSlice.js';
import { useAppDispatch } from '@/hooks/redux/index.js';
import { useForm } from '@/hooks/useForm.js';

import { validateUserEmail, validateUserPassword } from './LoginFormValidationInputs.js';
import { useLogin } from './context/login.context.js';
import { logginUser } from '@/services/login.services.js';
import { toastNotifications } from '@/utilities/notificationsSwal.js';
import LoginFormView from './LoginFormView.js';
import { userIsLoggin } from '@/redux/slice/authenticationSlice.js';
import { savePersistenDataUser } from '@/utilities/authenticationManagement.js';
import { type ValidationFunctions } from './index.types.js';

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
      const existValidationMessage = Object.keys(loginErrorRef.current).every(
        (el) => loginErrorRef.current[el] === null
      );
      if (existValidationMessage) {
        const response = await logginUser({
          email,
          password,
          remember_me: rememberMe
        });

        if ('data' in response) {
          response.data.user.rememberToken = rememberMe ? response.data.user.rememberToken : null;
          savePersistenDataUser(response);
          await userIsLoggedInPromise(response.data.user);
          navigate('/app/dashboard', { replace: true });
        } else if ('error' in response) {
          const errorsDetail = response.error.detail;
          Object.keys(errorsDetail).forEach((key) => {
            // TODO colocar el nombre apiResponse de manera global en una constante o cambiar nombre
            if (key !== 'apiResponseMessageError') {
              addValidationError({ [key]: errorsDetail[key] });
            }
          });

          if ('apiResponseMessageError' in errorsDetail) {
            if (errorsDetail.apiResponseMessageError !== null)
              throw new Error(errorsDetail.apiResponseMessageError);
          }
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
