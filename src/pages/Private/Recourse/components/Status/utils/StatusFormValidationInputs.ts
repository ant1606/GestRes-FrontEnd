import moment from 'moment';
import { type StatusFormData } from '../index.types';

export const validateFecha = (values: StatusFormData): ValidationInputResult => {
  console.log(values.lastStatusOfRecourse?.date);
  const myDate = moment(values.date);
  const dateOfLastStatus = moment(values.lastStatusOfRecourse?.date);
  const differenceBetweenDays = myDate.diff(dateOfLastStatus, 'days');
  if (differenceBetweenDays < 0)
    return 'No puede registrar una fecha anterior a la última fecha del registro de estado del recurso';
  return null;
};

export const validateEstadoId = (values: StatusFormData): ValidationInputResult => {
  return null;
};

export const validateComentario = (values: StatusFormData): ValidationInputResult => {
  return null;
};
