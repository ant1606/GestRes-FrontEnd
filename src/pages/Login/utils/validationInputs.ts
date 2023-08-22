import { type LoginFormData } from '../index.types';

export const validateUserEmail = (values: LoginFormData): ValidationInputResult => {
  const emailToValidate = values.email.trim();
  const regExFormatEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const emailValidFormat = regExFormatEmail.test(emailToValidate);
  if (emailToValidate.length === 0) {
    return 'Debe ingresar el email del usuario';
  }
  if (!emailValidFormat) {
    return 'Formato incorrecto ingresado del email';
  }
  return null;
};

export const validateUserPassword = (values: LoginFormData): ValidationInputResult => {
  const passwordToValidate = values.password.trim();
  if (passwordToValidate.length === 0) {
    return 'Debe ingresar el password del usuario';
  }
  return null;
};
