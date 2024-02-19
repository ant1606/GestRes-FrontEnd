import {
  statusAdapter,
  statusErrorResponseAdapter,
  statusesPaginatedAdapter,
  statusesPaginatedErrorResponseAdapter
} from '#/pages/Private/Recourse/components/Status/adapters/StatusAdapter';

import {
  type StatusErrorResponse,
  type StatusSuccessResponse,
  type StatusPaginatedErrorResponse,
  type StatusesPaginatedSuccessResponse
} from '#/pages/Private/Recourse/components/Status/index.types';
import { type FetchWithSessionHandlingType } from '#/hooks/useFetch';

export const getStatusPerRecourse = async (
  recourseId: number,
  fetchCallback: FetchWithSessionHandlingType,
  page: number = 1
): Promise<StatusesPaginatedSuccessResponse | StatusPaginatedErrorResponse> => {
  const url = `${
    import.meta.env.VITE_BACKEND_ENDPOINT
  }/v1/recourses/${recourseId}/status?page=${page}`;
  const response = await fetchCallback(url, 'GET');
  return response.status === 'success'
    ? statusesPaginatedAdapter(response)
    : statusesPaginatedErrorResponseAdapter(response);
};

export const savingStatus = async (
  status: any,
  recourseId: number,
  fetchCallback: FetchWithSessionHandlingType
): Promise<StatusSuccessResponse | StatusErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${recourseId}/status`;
  const response = await fetchCallback(url, 'POST', JSON.stringify(status));
  return response.status === 'success'
    ? statusAdapter(response)
    : statusErrorResponseAdapter(response);
};

export const destroyStatus = async (
  status: Status,
  fetchCallback: FetchWithSessionHandlingType
): Promise<StatusSuccessResponse | StatusErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/status/${status.id}`;
  const response = await fetchCallback(url, 'DELETE', JSON.stringify(status));
  return response.status === 'success'
    ? statusAdapter(response)
    : statusErrorResponseAdapter(response);
};
