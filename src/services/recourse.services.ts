import {
  recourseAdapter,
  recourseErrorResponseAdapter,
  recoursePaginatedErrorResponseAdapter,
  recoursesPaginatedAdapter
} from './../pages/Private/Recourse/adapters/RecourseAdapter';

import {
  type RecourseSuccessResponse,
  type RecourseErrorResponse,
  type RecoursesPaginatedSuccessResponse,
  type RecoursePaginatedErrorResponse,
  type RecourseRequestBody
} from '#/pages/Private/Recourse/index.types';
import { type FetchWithSessionHandlingType } from '#/hooks/useFetch';

export const getRecourses = async (
  queryParams: string,
  fetchCallback: FetchWithSessionHandlingType
): Promise<RecoursesPaginatedSuccessResponse | RecoursePaginatedErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses?${queryParams}`;
  const response = await fetchCallback(url, 'GET');
  return response.status === 'success'
    ? recoursesPaginatedAdapter(response)
    : recoursePaginatedErrorResponseAdapter(response);
};

export const getRecourse = async (
  id: number,
  fetchCallback: FetchWithSessionHandlingType
): Promise<RecourseSuccessResponse | RecourseErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${id}`;
  const response = await fetchCallback(url, 'GET');
  return response.status === 'success'
    ? recourseAdapter(response)
    : recourseErrorResponseAdapter(response);
};

export const savingRecourse = async (
  recourse: RecourseRequestBody,
  fetchCallback: FetchWithSessionHandlingType
): Promise<RecourseSuccessResponse | RecourseErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses`;
  const response = await fetchCallback(url, 'POST', JSON.stringify(recourse));
  return response.status === 'success'
    ? recourseAdapter(response)
    : recourseErrorResponseAdapter(response);
};

export const updatingRecourse = async (
  recourse: RecourseRequestBody,
  fetchCallback: FetchWithSessionHandlingType
): Promise<RecourseSuccessResponse | RecourseErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${recourse.recourse_id}`;
  const response = await fetchCallback(
    url,
    'PUT',
    JSON.stringify({
      ...recourse
    })
  );
  return response.status === 'success'
    ? recourseAdapter(response)
    : recourseErrorResponseAdapter(response);
};

export const destroyRecourse = async (
  recourse: Recourse,
  fetchCallback: FetchWithSessionHandlingType
): Promise<RecourseSuccessResponse | RecourseErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${recourse.id}`;
  const response = await fetchCallback(url, 'DELETE');
  return response.status === 'success'
    ? recourseAdapter(response)
    : recourseErrorResponseAdapter(response);
};
