export interface StatusesSuccessResponse {
  meta?: PaginateResultMeta | null;
  data: Status[];
  links?: PaginateResultLinks | null;
}

export interface StatusSuccessResponse {
  data: Status;
}

export interface StatusErrorResponse {
  error: {
    status: string;
    detail: StatusErrorDetailResponse;
  };
}

// Detalles de error de Validación
export interface StatusErrorDetailResponse extends ApiErrorResponse {
  date: string | null;
  comment: string | null;
  statusId: string | null;
  [key: string]: string | null;
}

export interface StatusFormData {
  date: string;
  statusId: number;
  comment: string;
  lastStatusOfRecourse?: Status;
  recourseStatus?: Settings[];
}
