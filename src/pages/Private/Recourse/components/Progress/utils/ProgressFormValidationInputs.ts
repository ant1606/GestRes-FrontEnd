import moment from 'moment';
import { type ProgressFormData } from '../indext.types';

export const validateDoneAmount = (values: ProgressFormData): ValidationInputResult => {
  if (values.done < 1) {
    return 'Avance debe ser mayor a 0';
  }
  if (values.done > values.lastProgress.pending) {
    return 'Avance debe ser menor a Pendiente';
  }
  return null;
};

export const validateDate = (values: ProgressFormData): ValidationInputResult => {
  const myDate = moment(values.date);
  const dateOfLastStatus = moment(values.lastProgress?.date);
  const differenceBetweenDays = myDate.diff(dateOfLastStatus, 'days');
  if (differenceBetweenDays < 0)
    return 'No puede registrar una fecha anterior a la última fecha del registro de estado del recurso';
  return null;
};
export const validateComment = (): ValidationInputResult => {
  return null;
};
