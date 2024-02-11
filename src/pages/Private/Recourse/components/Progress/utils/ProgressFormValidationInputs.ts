import moment from 'moment';
import { type ProgressFormData } from '../indext.types';
import { timeToSeconds } from '#/utilities/timeHelpers';

export const validateAdvancedAmount = (values: ProgressFormData): ValidationInputResult => {
  if (values.isHoursUnitMeasure) {
    if (timeToSeconds(values.advanced.toString()) === 0) {
      return 'Lo avanzado debe ser diferente a "00:00:00';
    }
    if (
      values.lastProgress !== undefined &&
      timeToSeconds(values.advanced.toString()) <= timeToSeconds(values.lastProgress.advanced)
    ) {
      return `Lo avanzado debe ser mayor a  ${values.lastProgress.advanced}`;
    }
    if (
      values.lastProgress !== undefined &&
      timeToSeconds(values.advanced.toString()) > timeToSeconds(values.lastProgress.total)
    ) {
      return `Lo avanzado debe ser menor o igual al Total del Recurso que es ${values.lastProgress.total}`;
    }
  } else {
    if (values.advanced < 1) {
      return 'El Avance  realizado debe ser mayor a 0';
    }
    if (
      values.lastProgress !== undefined &&
      values.advanced <= parseInt(values.lastProgress.advanced)
    ) {
      return `El Avance  realizado debe ser mayor al anterior avance realizado que fue  ${values.lastProgress.advanced}`;
    }
    if (
      values.lastProgress !== undefined &&
      values.advanced > parseInt(values.lastProgress.total)
    ) {
      return `Avance debe ser menor o igual a la cantidad Total del Recurso que es ${values.lastProgress.total}`;
    }
  }
  return null;
};

export const validateDoneAmount = (): null => null;

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
