export interface Top5Recourse {
  id: number;
  name: string;
}

// Respuesta no sanitizada obtenida desde el API
export interface ApiResponseTop5Recourse {
  id: string;
  name: string;
}

// Detalles de error de Validación
export interface Top5RecoursesErrorResponse {
  status: string;
  code: number;
  message: string;
  details: ApiErrorResponse;
}

// Respuesta sanitizada y paginada de recursos
export interface Top5RecoursesSuccessResponse {
  status: string;
  code: number;
  data: Top5Recourse[];
}
