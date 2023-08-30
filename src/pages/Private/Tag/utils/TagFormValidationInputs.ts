import { type TagFormData } from '../index.types';

const isBetween = (length: number, min: number, max: number): boolean =>
  length >= min && length <= max;

export const validateTagNombre = (values: TagFormData): ValidationInputResult => {
  const max = 50;
  const min = 3;
  const nombreToValidate = values.name.trim();

  if (nombreToValidate.length === 0) {
    return 'El nombre es requerido';
  }
  if (!isBetween(nombreToValidate.length, min, max)) {
    return `El nombre debe contener entre ${min} y ${max} caracteres.`;
  }
  return null;
};
