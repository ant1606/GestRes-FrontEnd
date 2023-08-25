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
        const response = await savingUser({
          name,
          email,
          password,
          passwordConfirmation
        });
        if ('data' in response) {
          setUserWasRegistered(true);
        } else if ('error' in response) {
          const errorsDetail = response.error?.detail;
          Object.keys(errorsDetail).forEach((key) => {
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
