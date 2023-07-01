export interface ResetPassword {
  email: string;
  password: string;
  passwordConfirmation: string;
}
export type ValidationMessage = string | null;

export const validateUserEmail = (values: ResetPassword): ValidationMessage => {
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

export const validateUserPassword = (values: ResetPassword): ValidationMessage => {
  const passwordToValidate = values.password?.trim();
  if (passwordToValidate.trim().length === 0) {
    return 'Debe ingresar el password del usuario';
  }
  return null;
};

export const validateUserPasswordConfirmation = (values: ResetPassword): ValidationMessage => {
  const passwordConfirmationToValidate = values.passwordConfirmation?.trim();
  const passwordToValidate = values.password?.trim();
  if (passwordConfirmationToValidate.trim().length === 0) {
    return 'Debe ingresar la confirmación de password del usuario';
  }
  if (passwordConfirmationToValidate !== passwordToValidate) {
    return 'Las contraseñas ingresadas no son iguales';
  }
  return null;
};
