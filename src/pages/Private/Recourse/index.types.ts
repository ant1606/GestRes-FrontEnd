import { type ApiResponseTag } from '../Tag/index.types';
import { type ApiResponseProgress } from './components/Progress/indext.types';

import { type ApiResponseStatus } from './components/Status/index.types';

export interface RecourseFormData {
  id: string;
  name: string;
  source: string;
  author: string;
  editorial: string;
  typeId: string;
  unitMeasureProgressId: string;
  totalVideos: string;
  totalHours: string;
  totalPages: string;
  totalChapters: string;
  recourseType: Settings[];
}

export interface RecourseRequestBody {
  recourse_id: number;
  name: string;
  source: string;
  author: string;
  editorial: string;
  type_id: number;
  unit_measure_progress_id: number;
  total_pages: number;
  total_chapters: number;
  total_videos: number;
  total_hours: string;
  tags: number[] | [];
}

/** ADAPTERS **/

// MAPEO DE DATOS DE LA RESPUESTA RECIBIDA POR LA API DE LA ENTIDAD RECOURSE
export interface ApiResponseSuccessRecourse {
  status: string;
  code: number;
  data: ApiResponseRecourse | [];
}
export interface ApiResponseRecourse {
  identificador: string;
  nombre: string;
  ruta: string;
  autor: string;
  editorial: string;
  tipoId: string;
  unidadMedidadProgresoId: string;
  tipoNombre: string;
  nombreEstadoActual: string;
  totalPaginas: string | null;
  totalCapitulos: string | null;
  totalVideos: string | null;
  totalHoras: string | null;
  totalProgresoPorcentaje: string;
  status: ApiResponseStatus;
  progress: ApiResponseProgress;
  tags: ApiResponseTag[];
}

// MAPEO DE DATOS DE RESPUESTA DE DATOS PAGINADOS CON RECOURSE
export interface RecoursesPaginatedSuccessResponse {
  status: string;
  code: number;
  meta: PaginateResultMeta | null;
  data: Recourse[];
  links: PaginateResultLinks | null;
}

export interface RecoursePaginatedErrorResponse {
  status: string;
  code: number;
  message: string;
  details: RecoursePaginatedErrorDetailResponse | never[];
}

export interface RecoursePaginatedErrorDetailResponse {
  searchTags: string;
  searchNombre: string;
  searchTipo: string;
  searchEstado: string;
}

// MAPEO DE DATOS DE RESPUESTA DE SÓLO UNA ENTIDAD RECOURSE

export interface RecourseSuccessResponse {
  code: number;
  status: string;
  data: Recourse | [];
}

export interface RecourseErrorResponse {
  code: number;
  status: string;
  message: string;
  details: RecourseErrorDetailResponse;
}

export interface RecourseErrorDetailResponse {
  name: string | null;
  source: string | null;
  author: string | null;
  editorial: string | null;
  typeId: string | null;
  unitMeasureProgressId: string | null;
  totalPages: string | null;
  totalChapters: string | null;
  totalVideos: string | null;
  totalHours: string | null;
  [key: string]: string | null;
}
