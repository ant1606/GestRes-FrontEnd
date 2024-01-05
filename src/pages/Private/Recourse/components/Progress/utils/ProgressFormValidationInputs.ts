import moment from 'moment';
import { type ProgressFormData } from '../indext.types';

export const validateAdvancedAmount = (values: ProgressFormData): ValidationInputResult => {
  if (values.advanced < 1) {
    return 'El Avance  realizado debe ser mayor a 0';
  }
  if (values.lastProgress !== undefined && values.advanced <= values.lastProgress.advanced) {
    return `El Avance  realizado debe ser mayor al anterior avance realizado que fue  ${values.lastProgress.advanced}`;
  }
  if (values.lastProgress !== undefined && values.advanced > values.lastProgress.total) {
    return `Avance debe ser menor o igual a la cantidad Total del Recurso que es ${values.lastProgress.total}`;
  }
  return null;
};

export const validateDoneAmount = (values: ProgressFormData): ValidationInputResult => {
  // if (values.done < 1) {
  //   return 'Avance debe ser mayor a 0';
  // }
  // if (values.lastProgress !== undefined && values.done > values.lastProgress.pending) {
  //   return 'Avance debe ser menor a Pendiente';
  // }
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
