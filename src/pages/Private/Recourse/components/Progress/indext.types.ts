export interface ProgressesSuccessResponse {
  meta?: PaginateResultMeta | null;
  data: Progress[];
  links?: PaginateResultLinks | null;
}

export interface ProgressSuccessResponse {
  data: Progress;
}

export interface ProgressErrorResponse {
  error: {
    progress: string;
    detail: ProgressErrorDetailResponse;
  };
}

// Detalles de error de Validación
export interface ProgressErrorDetailResponse extends ApiErrorResponse {
  date: string | null;
  comment: string | null;
  pending: string | null;
  done: string | null;
  [key: string]: string | null;
}
