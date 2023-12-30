import { type WebPageFormData } from '../index.types';

export const validateUrl = (values: WebPageFormData): ValidationInputResult => {
  const urlToValidate = values.url.toString().trim();

  // TODO Aplicar validación de formato de url mediante regex
  if (urlToValidate === '') return 'El link/url es requerido.';

  return null;
};

export const validateName = (): ValidationInputResult => {
  return null;
};

export const validateDescription = (): ValidationInputResult => {
  return null;
};
