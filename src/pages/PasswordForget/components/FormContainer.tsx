import React, { useEffect, useRef } from 'react';
import FormView from './FormView';
import { validateUserEmail } from '../../Register/utils/RegisterFormValidationInputs.js';
import { useForm } from '@/hooks/useForm.js';
import { useAppDispatch } from '@/hooks/redux/index.js';
import { isLoading } from '@/redux/slice/uiSlice.js';
import { processErrorResponse } from '@/utilities/processAPIResponse.util.js';
import { passwordForget } from '@/services/passwordForget.services.js';
import { toastNotifications } from '@/utilities/notificationsSwal.js';
import { usePasswordForget } from '../context/passwordForget.context.js';

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
        const response = await passwordForget(email);
        if ('data' in response) {
          setIfResetLinkWasGenerated(true);
        } else if ('error' in response) {
          const errorProcesed = processErrorResponse(response).error.detail;

          Object.keys(errorProcesed).forEach((key) => {
            if (key !== 'apiResponseMessageError') {
              addValidationError({ [key]: errorProcesed[key] });
            }
          });

          if ('apiResponseMessageError' in errorProcesed) {
            throw new Error(errorProcesed.apiResponseMessageError);
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
    <FormView
      email={email}
      handleInput={handleInputChange}
      handleSubmit={handleSubmitWrapper}
      userError={passwordForgetError}
    />
  );
};
