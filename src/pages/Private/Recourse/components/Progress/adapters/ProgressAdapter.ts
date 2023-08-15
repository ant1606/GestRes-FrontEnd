import {
  type ProgressErrorResponse,
  type ProgressesSuccessResponse,
  type ProgressSuccessResponse
} from '../indext.types';

export interface ApiResponseProgress {
  identificador: number;
  realizado: number;
  pendiente: number;
  fecha: string;
  comentario: string;
  esUltimoRegistro: boolean;
}

export const adapterProgress = (progress: ApiResponseProgress): Progress => {
  return {
    id: progress.identificador,
    done: progress.realizado,
    pending: progress.pendiente,
    date: progress.fecha,
    comment: progress.comentario,
    isLastRecord: progress.esUltimoRegistro
  };
};

export const progressAdapter = (progress: ApiResponseProgress): ProgressSuccessResponse => {
  return {
    data: adapterProgress(progress)
  };
};

export const adapterProgressesData = (progresses: ApiResponseProgress[]): Progress[] => {
  return progresses?.map((progress: ApiResponseProgress) => adapterProgress(progress));
};

export const progressesAdapter = (response: any): ProgressesSuccessResponse => {
  return {
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

export const progressErrorResponseAdapter = (error: any): ProgressErrorResponse => {
  return {
    error: {
      progress: error.error.progress,
      detail: {
        apiResponseMessageError: error.error.detail.api_response ?? null,
        comment: error.error.detail.comment ?? null,
        date: error.error.detail.date ?? null,
        done: error.error.detail.done ?? null,
        pending: error.error.detail.pending ?? null
      }
    }
  };
};
