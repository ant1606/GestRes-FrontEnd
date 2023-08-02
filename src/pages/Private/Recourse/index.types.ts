import { type ApiResponseTag } from '../Tag/index.types';
import { type ApiResponseProgress } from './components/Progress/adapters/ProgressAdapter';
import { type ApiResponseStatus } from './components/Status/adapters/StatusAdapter';

// Detalles de error de Validación
export interface RecourseErrorDetailResponse extends ApiErrorResponse {
  name: string | null;
  source: string | null;
  author: string | null;
  editorial: string | null;
  typeId: string | null;
  totalPages: string | null;
  totalChapters: string | null;
  totalVideos: string | null;
  totalHours: string | null;
  [key: string]: string | null;
}

export interface RecourseErrorResponse {
  error: {
    status: string;
    detail: RecourseErrorDetailResponse;
  };
}

// Respuesta sanitizada y paginada de recursos
export interface RecoursesSuccessResponse {
  meta: PaginateResultMeta | null;
  data: Recourse[];
  links: PaginateResultLinks | null;
}

export interface RecourseSuccessResponse {
  data: Recourse;
}

// Respuesta no sanitizada obtenida desde el API
export interface ApiResponseRecourse {
  identificador: string;
  nombre: string;
  ruta: string;
  autor: string;
  editorial: string;
  tipoId: string;
  tipoNombre: string;
  nombreEstadoActual: string;
  totalPaginas: string | null;
  totalCapitulos: string | null;
  totalVideos: string | null;
  totalHoras: string | null;
  status: ApiResponseStatus[];
  progress: ApiResponseProgress[];
  tags: ApiResponseTag[];
}
