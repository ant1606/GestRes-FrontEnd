export const validateTagNombre = (values) => {
  const max = 50;
  const min = 3;
  const nombreToValidate = values.name.trim();
  const isBetween = (length, min, max) => !(length < min || length > max);

  if (!nombreToValidate) {
    return 'El nombre es requerido';
  }
  if (!isBetween(nombreToValidate.length, min, max)) {
    return `El nombre debe contener entre ${min} y ${max} caracteres.`;
  }
  return null;
};
