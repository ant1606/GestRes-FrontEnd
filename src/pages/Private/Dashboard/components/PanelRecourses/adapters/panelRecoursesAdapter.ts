import {
  type RecourseTop5,
  type ApiResponseRecourse,
  type RecourseErrorResponse,
  type RecourseSuccessResponse,
  type RecoursesSuccessResponse
} from '../index.type';

const adapterRecourse = (recourse: ApiResponseRecourse): RecourseTop5 => {
  return {
    id: parseInt(recourse.identificador),
    name: recourse.nombre,
    typeId: parseInt(recourse.tipoId),
    currentStatusName: recourse.nombreEstadoActual,
    typeName: recourse.tipoNombre
  };
};

const adapterRecoursesData = (recourses: ApiResponseRecourse[]): RecourseTop5[] => {
  return recourses.map((recourse: ApiResponseRecourse) => adapterRecourse(recourse));
};

export const recourseAdapter = (recourse: ApiResponseRecourse): RecourseSuccessResponse => {
  return {
    data: adapterRecourse(recourse.data)
  };
};

export const recoursesAdapter = (response: any): RecoursesSuccessResponse => {
  if (response.data.length === 0) return { data: [] };
  return {
    data: adapterRecoursesData(response.data)
  };
};

export const recourseErrorResponseAdapter = (error: any): RecourseErrorResponse => {
  return {
    error: {
      status: error.error.status,
      detail: {
        apiResponseMessageError: error.error.detail.api_response ?? null
      }
    }
  };
};
