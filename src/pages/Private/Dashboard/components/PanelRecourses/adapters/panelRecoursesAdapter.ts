import {
  type ApiResponseTop5Recourse,
  type Top5RecoursesErrorResponse,
  type Top5RecoursesSuccessResponse,
  type Top5Recourse
} from '../index.type';

export const top5RecoursesAdapter = (response: any): Top5RecoursesSuccessResponse => {
  return {
    status: response.status,
    code: response.code,
    data: response.data.length === 0 ? [] : adapterTop5RecoursesData(response.data)
  };
};

const adapterTop5RecoursesData = (recourses: ApiResponseTop5Recourse[]): Top5Recourse[] => {
  return recourses.map((recourse: ApiResponseTop5Recourse) => ({
    id: parseInt(recourse.id),
    name: recourse.name
  }));
};

export const top5RecourseErrorResponseAdapter = (error: any): Top5RecoursesErrorResponse => {
  return {
    status: error.status,
    code: error.code,
    message: error.message,
    details: error.details
  };
};
