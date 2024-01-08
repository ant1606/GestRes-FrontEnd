import { adapterTagsData } from '../../Tag/adapters/TagAdapter';
import {
  adapterProgress,
  adapterProgressesData
} from '../components/Progress/adapters/ProgressAdapter';
import { adapterStatus, adapterStatusesData } from '../components/Status/adapters/StatusAdapter';
import {
  type RecourseSuccessResponse,
  type ApiResponseRecourse,
  type RecourseErrorResponse,
  type RecoursesSuccessResponse
} from '../index.types';

const adapterRecourse = (recourse: ApiResponseRecourse): Recourse => {
  // console.log(recourse);
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

const adapterRecoursesData = (recourses: ApiResponseRecourse[]): Recourse[] => {
  return recourses?.map((recourse: ApiResponseRecourse) => adapterRecourse(recourse));
};

export const recourseAdapter = (recourse: ApiResponseRecourse): RecourseSuccessResponse => {
  return {
    data: adapterRecourse(recourse.data)
  };
};

export const recoursesAdapter = (response: any): RecoursesSuccessResponse => {
  // console.log('Desde recourses Adapter, del servicio getRecourses', response);
  if (response.data.length === 0) return { meta: null, links: null, data: [] };
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
    data: adapterRecoursesData(response.data)
  };
};

export const recourseErrorResponseAdapter = (error: any): RecourseErrorResponse => {
  return {
    error: {
      status: error.error.status,
      detail: {
        apiResponseMessageError: error.error.detail.api_response ?? null,
        name: error.error.detail.name ?? null,
        source: error.error.detail.source ?? null,
        author: error.error.detail.author ?? null,
        editorial: error.error.detail.editorial ?? null,
        typeId: error.error.detail.type_id ?? null,
        unitMeasureProgressId: error.error.detail.unit_measure_progress_id ?? null,
        totalPages: error.error.detail.total_pages ?? null,
        totalChapters: error.error.detail.total_chapters ?? null,
        totalVideos: error.error.detail.total_videos ?? null,
        totalHours: error.error.detail.total_hours ?? null
      }
    }
  };
};
