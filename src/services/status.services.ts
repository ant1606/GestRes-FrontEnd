import {
  statusAdapter,
  statusErrorResponseAdapter,
  statusesAdapter
} from '#/pages/Private/Recourse/components/Status/adapters/StatusAdapter';
import {
  type StatusesSuccessResponse,
  type StatusErrorResponse,
  type StatusSuccessResponse
} from '#/pages/Private/Recourse/components/Status/index.types';
import { getBearerToken } from '#/utilities/authenticationManagement';
import { processErrorResponse } from '#/utilities/processAPIResponse.util';

export const getStatusPerRecourse = async (
  recourseId: number,
  page: number
): Promise<StatusesSuccessResponse | StatusErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${recourseId}/status?page=${page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${bearerToken}`
      }
    }
  )
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());
      return await resp.json();
    })
    .then(async (data) => statusesAdapter(await data))
    .catch(async (error) => statusErrorResponseAdapter(processErrorResponse(await error)));
};

export const savingStatus = async (
  status: any,
  recourseId: number
): Promise<StatusSuccessResponse | StatusErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${recourseId}/status`, {
    method: 'POST',
    body: JSON.stringify(status),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
  })
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());
      return await resp.json();
    })
    .then(async (data) => statusAdapter(await data))
    .catch(async (error) => statusErrorResponseAdapter(processErrorResponse(await error)));
};

export const destroyStatus = async (
  status: Status
): Promise<StatusSuccessResponse | StatusErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/status/${status.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
  })
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());

      return await resp.json();
    })
    .then(async (data) => statusAdapter(await data))
    .catch(async (error) => statusErrorResponseAdapter(processErrorResponse(await error)));
};
