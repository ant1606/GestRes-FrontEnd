import React, { useEffect, useRef } from 'react';
import FormView from './FormView';
import { validateUserEmail } from '../utils/validationInputs.js';
import { useForm } from '#/hooks/useForm.js';
import { useAppDispatch } from '#/hooks/redux/index.js';
import { isLoading } from '#/redux/slice/uiSlice.js';
import { passwordForget } from '#/services/passwordForget.services.js';
import { toastNotifications } from '#/utilities/notificationsSwal.js';
import { usePasswordForget } from '../context/passwordForget.context.js';
import { type PasswordForgetErrorResponse } from '../index.types.js';
import { useFetch } from '#/hooks/useFetch.js';

const validateFunctionsFormInputs = {
  email: validateUserEmail
};

const initialState = {
  email: ''
};

export const FormContainer: React.FC = () => {
  const { passwordForgetError, setIfResetLinkWasGenerated, addValidationError } =
    usePasswordForget();
  const {
    values: formValues,
    handleInputChange,
    validatedSubmitForm
  } = useForm(
    initialState,
    validateFunctionsFormInputs as Record<string, (values: unknown) => string | null>,
    addValidationError
  );

  const { email } = formValues;
  const dispatch = useAppDispatch();
  const { fetchWithoutAuthorizationRequiredHandling } = useFetch();
  const passwordForgetErrorRef = useRef<Record<string, string | null>>({});
  useEffect(() => {
    passwordForgetErrorRef.current = passwordForgetError;
  }, [passwordForgetError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      dispatch(isLoading(true));
      await validatedSubmitForm();
      const existValidationMessage = Object.keys(passwordForgetErrorRef.current).every(
        (el) => passwordForgetErrorRef.current[el] === null
      );
      if (existValidationMessage) {
        const response = await passwordForget(email, fetchWithoutAuthorizationRequiredHandling);

        if (response.status === 'error') {
          const responseError = response as PasswordForgetErrorResponse;
          // Errores de validación de campos por parte del backend
          Object.entries(responseError.details).forEach(([key, value]) => {
            addValidationError({ [key]: value });
          });

          // Mensaje de error general por parte del backend
          if (responseError.message !== '') {
            throw new Error(responseError.message);
          }
        } else {
          setIfResetLinkWasGenerated(true);
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
      handleInput={handleInputChange}
      handleSubmit={handleSubmitWrapper}
      userError={passwordForgetError}
    />
  );
};
