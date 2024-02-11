import {
  type StatusesPaginatedSuccessResponse,
  type ApiResponseStatus,
  type StatusErrorResponse,
  type StatusSuccessResponse,
  type StatusPaginatedErrorResponse,
  type ApiResponseSuccessStatus
} from '../index.types';

export const statusesPaginatedAdapter = (response: any): StatusesPaginatedSuccessResponse => {
  if (response.data.length === 0)
    return {
      code: response.code,
      status: response.status,
      meta: null,
      links: null,
      data: []
    };
  return {
    code: response.code,
    status: response.status,
    meta: {
      path: response.meta.path,
      currentPage: response.meta.currentPage,
      perPage: response.meta.perPage,
      totalPages: response.meta.totalPages,
      from: response.meta.from,
      to: response.meta.to,
      total: response.meta.total
    },
    links: {
      self: response.links.self,
      first: response.links.first,
      last: response.links.last,
      next: response.links.next,
      prev: response.links.prev
    },
    data: adapterStatusesData(response.data)
  };
};

export const adapterStatusesData = (statuses: ApiResponseStatus[]): Status[] => {
  return statuses?.map((status: ApiResponseStatus) => adapterStatus(status));
};

export const statusesPaginatedErrorResponseAdapter = (error: any): StatusPaginatedErrorResponse => {
  return {
    code: error.code,
    message: error.message,
    status: error.status
  };
};

export const statusAdapter = (response: ApiResponseSuccessStatus): StatusSuccessResponse => {
  return {
    status: response.status,
    code: response.code,
    data: Array.isArray(response.data) ? [] : adapterStatus(response.data)
  };
};

export const adapterStatus = (status: ApiResponseStatus): Status => {
  return {
    id: status.identificador,
    date: status.fecha,
    comment: status.comentario,
    statusId: status.estadoId,
    statusName: status.estadoNombre,
    isLastRecord: status.esUltimoRegistro
  };
};

export const statusErrorResponseAdapter = (error: any): StatusErrorResponse => {
  return {
    code: error.code,
    message: error.message,
    status: error.status,
    details: {
      comment: error.details.comment ?? null,
      date: error.details.date ?? null,
      statusId: error.details.status_id ?? null
    }
  };
};
