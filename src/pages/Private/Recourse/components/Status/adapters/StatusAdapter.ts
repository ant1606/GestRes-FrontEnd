import {
  type StatusesSuccessResponse,
  type StatusErrorResponse,
  type StatusSuccessResponse
} from '../index.types';

export interface ApiResponseStatus {
  identificador: number;
  fecha: string;
  comentario: string;
  estadoId: number;
  estadoNombre: string;
}

export const adapterStatus = (status: ApiResponseStatus): Status => {
  return {
    id: status.identificador,
    date: status.fecha,
    comment: status.comentario,
    statusId: status.estadoId,
    statusName: status.estadoNombre
  };
};

export const statusAdapter = (status: ApiResponseStatus): StatusSuccessResponse => {
  return {
    data: adapterStatus(status)
  };
};

export const adapterStatusesData = (statuses: ApiResponseStatus[]): Status[] => {
  return statuses?.map((status: ApiResponseStatus) => adapterStatus(status));
};

export const statusesAdapter = (response: any): StatusesSuccessResponse => {
  return {
    data: adapterStatusesData(response.data)
  };
};

export const statusErrorResponseAdapter = (error: any): StatusErrorResponse => {
  return {
    error: {
      status: error.error.status,
      detail: {
        apiResponseMessageError: error.error.detail.api_response ?? null,
        comment: error.error.detail.comment ?? null,
        date: error.error.detail.date ?? null,
        statusId: error.error.detail.status_id ?? null
      }
    }
  };
};
