import React, { useEffect, useRef } from 'react';
import FormView from './FormView';
import { useForm } from '@/hooks/useForm';
import {
  validateUserEmail,
  validateUserName,
  validateUserPassword,
  validateUserPasswordConfirmation
} from '../RegisterFormValidationInputs';
import { toastNotifications } from '@/utilities/notificationsSwal';
import { useAppDispatch } from '@/hooks/redux';
import { isLoading } from '@/redux/slice/uiSlice';
import { useRegister } from '../context/register.context';
import { processErrorResponse } from '@/utilities/processAPIResponse.util';
import { savingUser } from '@/services/register.services';

interface ResponseAPI {
  data?: Record<string, any>;
  error?: Record<string, any>;
}

const validateFunctionsFormInputs = {
  name: validateUserName,
  email: validateUserEmail,
  password: validateUserPassword,
  passwordConfirmation: validateUserPasswordConfirmation
};
const initialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

export const FormContainer: React.FC = () => {
  const { registerError, addValidationError, setUserWasRegistered } = useRegister();
  const {
    values: formValues,
    handleInputChange,
    validatedSubmitForm
  } = useForm(
    initialState,
    validateFunctionsFormInputs as Record<string, (values: unknown) => string | null>,
    addValidationError
  );
  const { name, email, password, passwordConfirmation } = formValues;
  const dispatch = useAppDispatch();
  const registerErrorRef = useRef<Record<string, string | null>>({});
  useEffect(() => {
    registerErrorRef.current = registerError;
  }, [registerError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      dispatch(isLoading(true));
      await validatedSubmitForm();
      const existValidationMessage = Object.keys(registerErrorRef.current).every(
        (el) => registerErrorRef.current[el] === null
      );
      if (existValidationMessage) {
        const response: ResponseAPI = await savingUser({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation
        });
        if ('data' in response) {
          setUserWasRegistered(true);
        } else if ('error' in response) {
          const errorsDetail = response.error?.detail;
          Object.keys(errorsDetail).forEach((key) => {
            // TODO colocar el nombre api_response de manera global en una constante o cambiar nombre
            if (key !== 'apiResponse') {
              addValidationError({ [key]: errorsDetail[key] });
            }
          });

          if ('apiResponse' in errorsDetail) {
            throw new Error(errorsDetail.apiResponse);
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
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmitWrapper}
      name={name}
      password={password}
      passwordConfirmation={passwordConfirmation}
      userError={registerError}
    />
  );
};
