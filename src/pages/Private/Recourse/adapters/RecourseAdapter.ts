import { adapterTagsData } from '../../Tag/adapters/TagAdapter';
import { adapterProgress } from '../components/Progress/adapters/ProgressAdapter';
import { adapterStatus } from '../components/Status/adapters/StatusAdapter';
import {
  type RecourseSuccessResponse,
  type ApiResponseRecourse,
  type RecourseErrorResponse,
  type RecoursesPaginatedSuccessResponse,
  type RecoursePaginatedErrorResponse,
  type ApiResponseSuccessRecourse
} from '../index.types';

export const recoursesPaginatedAdapter = (response: any): RecoursesPaginatedSuccessResponse => {
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
    data: adapterRecoursesData(response.data)
  };
};

const adapterRecoursesData = (recourses: ApiResponseRecourse[]): Recourse[] => {
  return recourses?.map((recourse: ApiResponseRecourse) => adapterRecourse(recourse));
};

export const recoursePaginatedErrorResponseAdapter = (
  error: any
): RecoursePaginatedErrorResponse => {
  return {
    status: error.status,
    code: error.code,
    message: error.message,
    details: {
      searchEstado: error.details.searchEstado ?? null,
      searchNombre: error.details.searchNombre ?? null,
      searchTags: error.details.searchTags ?? null,
      searchTipo: error.details.searchTipo ?? null
    }
  };
};

export const recourseAdapter = (response: ApiResponseSuccessRecourse): RecourseSuccessResponse => {
  return {
    code: response.code,
    status: response.status,
    data: Array.isArray(response.data) ? [] : adapterRecourse(response.data)
  };
};

const adapterRecourse = (recourse: ApiResponseRecourse): Recourse => {
  return {
    id: parseInt(recourse.identificador),
    name: recourse.nombre,
    author: recourse.autor,
    source: recourse.ruta,
    editorial: recourse.editorial,
    typeId: parseInt(recourse.tipoId),
    unitMeasureProgressId: parseInt(recourse.unidadMedidadProgresoId),
    totalPages: recourse.totalPaginas === null ? null : parseInt(recourse.totalPaginas),
    totalChapters: recourse.totalCapitulos === null ? null : parseInt(recourse.totalCapitulos),
    totalVideos: recourse.totalVideos === null ? null : parseInt(recourse.totalVideos),
    totalHours: recourse.totalHoras === null ? null : recourse.totalHoras,
    totalProgressPercentage:
      recourse.totalProgresoPorcentaje === null ? 0 : parseFloat(recourse.totalProgresoPorcentaje),
    status: recourse.status === null ? [] : adapterStatus(recourse.status),
    progress: recourse.progress === null ? [] : adapterProgress(recourse.progress),
    tags: adapterTagsData(recourse.tags),
    currentStatusName: recourse.nombreEstadoActual,
    typeName: recourse.tipoNombre
  };
};

export const recourseErrorResponseAdapter = (error: any): RecourseErrorResponse => {
  return {
    status: error.status,
    code: error.code,
    message: error.message,
    details: {
      name: error.details.name ?? null,
      source: error.details.source ?? null,
      author: error.details.author ?? null,
      editorial: error.details.editorial ?? null,
      typeId: error.details.type_id ?? null,
      unitMeasureProgressId: error.details.unit_measure_progress_id ?? null,
      totalPages: error.details.total_pages ?? null,
      totalChapters: error.details.total_chapters ?? null,
      totalVideos: error.details.total_videos ?? null,
      totalHours: error.details.total_hours ?? null
    }
  };
};
