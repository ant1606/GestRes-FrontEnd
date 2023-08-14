import moment from 'moment';
import { type StatusFormData } from '../index.types';
import { GLOBAL_STATUS_RECOURSE } from '@/config/globalConstantes';

export const validateFecha = (values: StatusFormData): ValidationInputResult => {
  console.log(values);
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
  const stateName = values.recourseStatus?.filter((status) => status.id === values.statusId)[0]
    .value;
  if (
    stateName === GLOBAL_STATUS_RECOURSE.DESCARTADO ||
    stateName === GLOBAL_STATUS_RECOURSE.DESFASADO
  ) {
    if (values.comment.trim() === '') {
      return `Debe ingresar un comentario al cambiar a estado ${stateName}`;
    }
  }
  return null;
};
