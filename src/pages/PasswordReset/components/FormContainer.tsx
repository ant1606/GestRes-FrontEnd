import React, { useEffect, useRef } from 'react';
import FormView from './FormView';
import { usePasswordReset } from '../context/passwordReset.context';
import {
  validateUserEmail,
  validateUserPassword,
  validateUserPasswordConfirmation
} from '../validationInputs';
import { useForm } from '@/hooks/useForm';
import { useAppDispatch } from '@/hooks/redux';
import { isLoading } from '@/redux/slice/uiSlice';
import { resetPassword } from '@/services/resetPassword.services';
import { processErrorResponse } from '@/utilities/processAPIResponse.util';
import { toastNotifications } from '@/utilities/notificationsSwal';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ResponseAPI {
  data?: Record<string, any>;
  error?: Record<string, any>;
}

const initialState = {
  email: '',
  password: '',
  passwordConfirmation: ''
};
const validateFunctionsFormInputs = {
  email: validateUserEmail,
  password: validateUserPassword,
  passwordConfirmation: validateUserPasswordConfirmation
};
export const FormContainer: React.FC = () => {
  const { passwordResetError, addValidationError } = usePasswordReset();
  const {
    values: formValues,
    handleInputChange,
    validatedSubmitForm
  } = useForm(
    initialState,
    validateFunctionsFormInputs as Record<string, (values: unknown) => string | null>,
    addValidationError
  );
  const { email, password, passwordConfirmation } = formValues;
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const passwordResetErrorRef = useRef<Record<string, string | null>>({});

  useEffect(() => {
    passwordResetErrorRef.current = passwordResetError;
  }, [passwordResetError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      dispatch(isLoading(true));
      await validatedSubmitForm();
      const existValidationMessage = Object.keys(passwordResetErrorRef.current).every(
        (el) => passwordResetErrorRef.current[el] === null
      );
      if (existValidationMessage) {
        const token = searchParams.get('token');
        if (token?.trim().length === 0 || token === null) {
          throw new Error('Token no válido');
        }
        const response: ResponseAPI = await resetPassword({
          email,
          password,
          password_confirmation: passwordConfirmation,
          token: token ?? ''
        });
        if ('data' in response) {
          toastNotifications().toastSuccesCustomize('Su contraseña fue cambiada con éxito.');
          navigate('/login', { replace: true });
        } else if ('error' in response) {
          const errorProcesed = processErrorResponse(response.error?.detail);
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
    <FormView
      email={email}
      handleInput={handleInputChange}
      handleSubmit={handleSubmitWrapper}
      password={password}
      passwordConfirmation={passwordConfirmation}
      userError={passwordResetError}
    />
  );
};
