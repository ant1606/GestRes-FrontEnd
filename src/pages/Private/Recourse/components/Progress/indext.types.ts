/** REQUEST BODY **/

export interface ProgressFormData {
  date: string;
  done: number;
  advanced: number;
  pending: number;
  comment: string;
  isHoursUnitMeasure: boolean;
  lastProgress?: Progress;
}

/** ADAPTERS **/

// MAPEO DE RESPUESTA POR PARTE DE LA API
export interface ApiResponseSuccessProgress {
  status: string;
  code: number;
  data: ApiResponseProgress | [];
}
export interface ApiResponseProgress {
  identificador: number;
  realizado: number;
  pendiente: number;
  avanzadoHasta: number;
  fecha: string;
  comentario: string;
  esUltimoRegistro: boolean;
  total: number;
}
// MAPEO DE DATOS PAGINADOS DE PROGRESS
export interface ProgressesPaginatedSuccessResponse {
  status: string;
  code: number;
  meta: PaginateResultMeta | null;
  data: Progress[];
  links: PaginateResultLinks | null;
}
export interface ProgressesPaginatedErrorResponse {
  status: string;
  code: number;
  message: string;
}

// MAPEO DE DATOS DE RESPUESTA DE UNA SOLA ENTIDAD DE PROGRESS
export interface ProgressSuccessResponse {
  code: number;
  status: string;
  data: Progress | [];
}

export interface ProgressErrorResponse {
  status: string;
  code: number;
  message: string;
  details: ProgressErrorDetailResponse;
}

export interface ProgressErrorDetailResponse {
  date: string | null;
  comment: string | null;
  pending: string | null;
  advanced: string | null;
  done: string | null;
  [key: string]: string | null;
}
