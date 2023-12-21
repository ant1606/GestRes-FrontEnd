import { GLOBAL_TYPES_RECOURSE } from '#/config/globalConstantes';
import { type RecourseFormData } from '../index.types';

const isBetween = (length: number, min: number, max: number): boolean =>
  length >= min && length <= max;

export const validateName = (values: RecourseFormData): ValidationInputResult => {
  const min = 5;
  const max = 150;
  const nameToValidate = values.name.toString().trim();

  if (nameToValidate === '') return 'El nombre es requerido.';

  if (!isBetween(nameToValidate.length, min, max))
    return `El nombre debe contener entre ${min} a ${max} caracteres.`;

  return null;
};

export const validateSource = (values: RecourseFormData): ValidationInputResult => {
  const min = 5;
  const max = 255;
  const sourceToValidate = values.source.toString().trim();

  if (sourceToValidate === '') return 'La ruta es requerida.';

  if (!isBetween(sourceToValidate.length, min, max))
    return `La ruta debe contener entre ${min} a ${max} caracteres.`;

  return null;
};

export const validateAuthor = (values: RecourseFormData): ValidationInputResult => {
  const min = 5;
  const max = 75;
  const authorToValidate = values.author.toString().trim();

  if (authorToValidate !== '' && !isBetween(authorToValidate.length, min, max))
    return `El autor debe contener entre ${min} a ${max} caracteres.`;

  return null;
};

export const validateEditorial = (values: RecourseFormData): ValidationInputResult => {
  const min = 5;
  const max = 75;
  const editorialToValidate = values.editorial.toString().trim();

  if (editorialToValidate !== '' && !isBetween(editorialToValidate.length, min, max))
    return `La editorial debe contener entre ${min} a ${max} caracteres.`;

  return null;
};

export const validateTypeId = (values: RecourseFormData): ValidationInputResult => {
  const validateTypeId = parseInt(values.typeId);
  const isValidTypeId = values.recourseType.some((type) => type.id === validateTypeId);

  if (!isValidTypeId) return 'Debe seleccionar el Tipo de Recurso válido.';

  return null;
};

export const validateTotalPages = (values: RecourseFormData): ValidationInputResult => {
  // TODO aplicar regex para que sólo se admitan numeros enteros
  const validateTotalPages = parseInt(values.totalPages);
  const typeLibro = values.recourseType.find(
    (value) => value.key === GLOBAL_TYPES_RECOURSE.RECOURSE_TYPE_LIBRO
  );
  const isTipoLibro = parseInt(values.typeId) === typeLibro?.id;

  if (isTipoLibro) {
    if (validateTotalPages === 0) return 'Total Páginas es requerido';

    if (!Number.isInteger(validateTotalPages)) return 'Total Páginas debe ser un número entero';

    if (validateTotalPages <= 0) return 'Total Páginas debe ser mayor a 0';
  }

  return null;
};

export const validateTotalChapters = (values: RecourseFormData): ValidationInputResult => {
  const validateTotalChapters = parseInt(values.totalChapters);
  const typeLibro = values.recourseType.find(
    (value) => value.key === GLOBAL_TYPES_RECOURSE.RECOURSE_TYPE_LIBRO
  );
  const isTipoLibro = parseInt(values.typeId) === typeLibro?.id;

  if (isTipoLibro) {
    if (validateTotalChapters === 0) return 'Total Capitulos es requerido';

    if (!Number.isInteger(validateTotalChapters))
      return 'Total Capítulos debe ser un número entero';

    if (validateTotalChapters <= 0) return 'Total Capítulos debe ser mayor a 0';
  }

  return null;
};

export const validateTotalVideos = (values: RecourseFormData): ValidationInputResult => {
  const typeVideo = values.recourseType.find(
    (value) => value.key === GLOBAL_TYPES_RECOURSE.RECOURSE_TYPE_VIDEO
  );
  const isTipoVideo = parseInt(values.typeId) === typeVideo?.id;

  if (isTipoVideo) {
    const validateTotalVideos = parseInt(values.totalVideos);

    if (validateTotalVideos === 0) return 'Total Videos es requerido';

    if (!Number.isInteger(validateTotalVideos)) return 'Total Videos debe ser un número entero';

    if (validateTotalVideos <= 0) return 'Total Videos debe ser mayor a 0';
  }

  return null;
};

export const validateTotalHours = (values: RecourseFormData): ValidationInputResult => {
  const typeVideo = values.recourseType.find(
    (value) => value.key === GLOBAL_TYPES_RECOURSE.RECOURSE_TYPE_VIDEO
  );
  const isTipoVideo = parseInt(values.typeId) === typeVideo?.id;

  if (isTipoVideo) {
    const validateTotalHours = values.totalHours;
    const regex = /(\d+):([0-5][0-9]):([0-5][0-9])/;
    if (validateTotalHours.length === 0) return 'Total Horas es requerido';

    // if(validateTotalHours === "00:00:00")
    //     return "Total Horas debe tener un valor distinto a 0";

    if (!regex.test(validateTotalHours)) return 'Total Horas debe ser en formato hh:mm:ss ';
  }

  return null;
};
