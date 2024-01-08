import moment from 'moment';
import { type ProgressFormData } from '../indext.types';

export const validateAdvancedAmount = (values: ProgressFormData): ValidationInputResult => {
  if (values.isTypeVideo) {
    if (timeToSeconds(values.advanced) === 0) {
      return 'Lo avanzado debe ser diferente a "00:00:00';
    }
    if (
      values.lastProgress !== undefined &&
      timeToSeconds(values.advanced) <= timeToSeconds(values.lastProgress.advanced)
    ) {
      return `Lo avanzado debe ser mayor a  ${values.lastProgress.advanced}`;
    }
    if (
      values.lastProgress !== undefined &&
      timeToSeconds(values.advanced) > timeToSeconds(values.lastProgress.total)
    ) {
      return `Lo avanzado debe ser menor o igual al Total del Recurso que es ${values.lastProgress.total}`;
    }
  } else {
    if (values.advanced < 1) {
      return 'El Avance  realizado debe ser mayor a 0';
    }
    if (values.lastProgress !== undefined && values.advanced <= values.lastProgress.advanced) {
      return `El Avance  realizado debe ser mayor al anterior avance realizado que fue  ${values.lastProgress.advanced}`;
    }
    if (values.lastProgress !== undefined && values.advanced > values.lastProgress.total) {
      return `Avance debe ser menor o igual a la cantidad Total del Recurso que es ${values.lastProgress.total}`;
    }
  }
  return null;
};

const timeToSeconds = (hora1) => {
  const [horas1, minutos1, segundos1] = hora1.split(':').map(Number);
  return horas1 * 3600 + minutos1 * 60 + segundos1;
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
    return 'La fecha no puede ser menor a la fecha del último registro';
  return null;
};

export const validateComment = (): ValidationInputResult => {
  return null;
};
