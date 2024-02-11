/** REQUEST BODY **/
export interface StatusFormData {
  date: string;
  statusId: number | string;
  comment: string;
  lastStatusOfRecourse?: Status;
  recourseStatus?: Settings[];
}

/** ADAPTERS **/

// MAPEO DE RESPUESTA POR PARTE DE LA API
export interface ApiResponseSuccessStatus {
  status: string;
  code: number;
  data: ApiResponseStatus | [];
}
export interface ApiResponseStatus {
  identificador: number;
  fecha: string;
  comentario: string;
  estadoId: number;
  estadoNombre: string;
  esUltimoRegistro: boolean;
}

// MAPEO DE DATOS DE RESPUESTA PAGINADA
export interface StatusesPaginatedSuccessResponse {
  status: string;
  code: number;
  meta: PaginateResultMeta | null;
  data: Status[];
  links: PaginateResultLinks | null;
}

export interface StatusPaginatedErrorResponse {
  status: string;
  code: number;
  message: string;
}

// MAPEO DE DATOS DE RESPUESTA DE UNA SOLA ENTIDAD STATUS
export interface StatusSuccessResponse {
  status: string;
  code: number;
  data: Status | [];
}

export interface StatusErrorResponse {
  status: string;
  code: number;
  message: string;
  details: StatusErrorDetailResponse;
}

export interface StatusErrorDetailResponse {
  date: string | null;
  comment: string | null;
  statusId: string | null;
  [key: string]: string | null;
}
