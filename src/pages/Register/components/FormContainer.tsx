import React, { useEffect, useRef } from 'react';
import { useForm } from '#/hooks/useForm';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { useAppDispatch } from '#/hooks/redux';
import { isLoading } from '#/redux/slice/uiSlice';
import { savingUser } from '#/services/register.services';
import FormView from './FormView';
import {
  validateUserEmail,
  validateUserName,
  validateUserPassword,
  validateUserPasswordConfirmation
} from '../utils/validationInputs';
import { useRegister } from '../context/register.context';
import { type RegisterErrorResponse } from '../index.types';
import { useFetch } from '#/hooks/useFetch';

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
  const { fetchWithoutAuthorizationRequiredHandling } = useFetch();
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
        const response = await savingUser(
          {
            name,
            email,
            password,
            passwordConfirmation
          },
          fetchWithoutAuthorizationRequiredHandling
        );

        if (response.status === 'error') {
          const responseError = response as RegisterErrorResponse;
          // Errores de validación de campos por parte del backend
          Object.entries(responseError.details).forEach(([key, value]) => {
            addValidationError({ [key]: value });
          });

          // Mensaje de error general por parte del backend
          if (responseError.message !== '') {
            throw new Error(responseError.message);
          }
        } else {
          setUserWasRegistered(true);
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
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmitWrapper}
      name={name}
      password={password}
      passwordConfirmation={passwordConfirmation}
      userError={registerError}
    />
  );
};
