// Detalles de error de Validación
export interface RecourseErrorResponse {
  error: {
    status: string;
    detail: ApiErrorResponse;
  };
}

// Respuesta sanitizada y paginada de recursos
export interface RecoursesSuccessResponse {
  data: RecourseTop5[];
}

export interface RecourseSuccessResponse {
  data: RecourseTop5;
}

// Respuesta no sanitizada obtenida desde el API
export interface ApiResponseRecourse {
  identificador: string;
  nombre: string;
  tipoId: string;
  tipoNombre: string;
  nombreEstadoActual: string;
}

export interface RecourseTop5 {
  id: number;
  name: string;
  typeId: number;
  currentStatusName?: string;
  typeName?: string;
}
