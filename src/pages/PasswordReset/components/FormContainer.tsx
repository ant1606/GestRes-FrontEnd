import React, { useEffect, useRef } from 'react';
import { useForm } from '#/hooks/useForm';
import { useAppDispatch } from '#/hooks/redux';
import { isLoading } from '#/redux/slice/uiSlice';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { passwordReset } from '#/services';
import FormView from './FormView';
import { usePasswordReset } from '../context/passwordReset.context';
import {
  validateUserEmail,
  validateUserPassword,
  validateUserPasswordConfirmation
} from '../utils/validationInputs';

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
        const response = await passwordReset({
          email,
          password,
          password_confirmation: passwordConfirmation,
          token: token ?? ''
        });
        if ('data' in response) {
          toastNotifications().toastSuccesCustomize('Su contraseña fue cambiada con éxito.');
          navigate('/login', { replace: true });
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
      handleInput={handleInputChange}
      handleSubmit={handleSubmitWrapper}
      password={password}
      passwordConfirmation={passwordConfirmation}
      userError={passwordResetError}
    />
  );
};
