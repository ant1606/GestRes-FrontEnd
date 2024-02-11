import {
  type ProgressesPaginatedSuccessResponse,
  type ProgressErrorResponse,
  type ProgressSuccessResponse,
  type ApiResponseProgress,
  type ProgressesPaginatedErrorResponse,
  type ApiResponseSuccessProgress
} from '../indext.types';

export const progressesPaginatedAdapter = (response: any): ProgressesPaginatedSuccessResponse => {
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
    data: adapterProgressesData(response.data)
  };
};

export const adapterProgressesData = (progresses: ApiResponseProgress[]): Progress[] => {
  return progresses?.map((progress: ApiResponseProgress) => adapterProgress(progress));
};

export const progressPaginatedErrorResponseAdapter = (
  error: any
): ProgressesPaginatedErrorResponse => {
  return {
    code: error.code,
    message: error.message,
    status: error.status
  };
};

export const progressAdapter = (response: ApiResponseSuccessProgress): ProgressSuccessResponse => {
  return {
    code: response.code,
    status: response.status,
    data: Array.isArray(response.data) ? [] : adapterProgress(response.data)
  };
};

export const adapterProgress = (progress: ApiResponseProgress): Progress => {
  return {
    id: progress.identificador,
    done: progress.realizado.toString(),
    advanced: progress.avanzadoHasta.toString(),
    pending: progress.pendiente.toString(),
    date: progress.fecha,
    comment: progress.comentario,
    isLastRecord: progress.esUltimoRegistro,
    total: progress.total.toString()
  };
};

export const progressErrorResponseAdapter = (error: any): ProgressErrorResponse => {
  return {
    code: error.code,
    message: error.message,
    status: error.status,
    details: {
      apiResponseMessageError: error.details.api_response ?? null,
      comment: error.details.comment ?? null,
      date: error.details.date ?? null,
      advanced: error.details.advanced ?? null,
      done: error.details.done ?? null,
      pending: error.details.pending ?? null,
      total: error.details.total ?? null
    }
  };
};
