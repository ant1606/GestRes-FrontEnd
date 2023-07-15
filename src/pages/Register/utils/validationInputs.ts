import { type RegisterFormData } from '../index.types';

export const validateUserName = (values: RegisterFormData): ValidationInputResult => {
  const nameToValidate = values.name.trim();
  if (nameToValidate.trim().length === 0) {
    return 'Debe ingresar el nombre del usuario';
  }
  return null;
};

export const validateUserEmail = (values: RegisterFormData): ValidationInputResult => {
  const emailToValidate = values.email.trim();
  const regExFormatEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const emailValidFormat = regExFormatEmail.test(emailToValidate);
  if (emailToValidate.trim().length === 0) {
    return 'Debe ingresar el email del usuario';
  }
  if (!emailValidFormat) {
    return 'Formato incorrecto ingresado del email';
  }
  return null;
};

export const validateUserPassword = (values: RegisterFormData): ValidationInputResult => {
  const passwordToValidate = values.password.trim();
  if (passwordToValidate.trim().length === 0) {
    return 'Debe ingresar el password del usuario';
  }
  return null;
};
export const validateUserPasswordConfirmation = (
  values: RegisterFormData
): ValidationInputResult => {
  const passwordConfirmationToValidate = values.passwordConfirmation.trim();
  const passwordToValidate = values.password.trim();
  if (passwordConfirmationToValidate.trim().length === 0) {
    return 'Debe ingresar la confirmación de password del usuario';
  }
  if (passwordConfirmationToValidate !== passwordToValidate) {
    return 'Las contraseñas ingresadas no son iguales';
  }
  return null;
};
