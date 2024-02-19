import { type FetchWithSessionHandlingType } from '#/hooks/useFetch';
import {
  progressAdapter,
  progressErrorResponseAdapter,
  progressPaginatedErrorResponseAdapter,
  progressesPaginatedAdapter
} from '#/pages/Private/Recourse/components/Progress/adapters/ProgressAdapter';
import {
  type ProgressSuccessResponse,
  type ProgressErrorResponse,
  type ProgressesPaginatedSuccessResponse,
  type ProgressesPaginatedErrorResponse
} from '#/pages/Private/Recourse/components/Progress/indext.types';

export const getProgressPerRecourse = async (
  recourseId: number,
  fetchCallback: FetchWithSessionHandlingType,
  page: number = 1
): Promise<ProgressesPaginatedSuccessResponse | ProgressesPaginatedErrorResponse> => {
  const url = `${
    import.meta.env.VITE_BACKEND_ENDPOINT
  }/v1/recourses/${recourseId}/progress?page=${page}&perPage=5`;
  const response = await fetchCallback(url, 'GET');
  return response.status === 'success'
    ? progressesPaginatedAdapter(response)
    : progressPaginatedErrorResponseAdapter(response);
};

export const savingProgress = async (
  progress: any,
  recourseId: number,
  fetchCallback: FetchWithSessionHandlingType
): Promise<ProgressSuccessResponse | ProgressErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${recourseId}/progress`;
  const response = await fetchCallback(url, 'POST', JSON.stringify(progress));
  return response.status === 'success'
    ? progressAdapter(response)
    : progressErrorResponseAdapter(response);
};

export const destroyProgress = async (
  progress: Progress,
  fetchCallback: FetchWithSessionHandlingType
): Promise<ProgressSuccessResponse | ProgressErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/progress/${progress.id}`;
  const response = await fetchCallback(url, 'DELETE');
  return response.status === 'success'
    ? progressAdapter(response)
    : progressErrorResponseAdapter(response);
};
