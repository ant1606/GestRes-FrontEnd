import {
  progressAdapter,
  progressErrorResponseAdapter,
  progressesAdapter
} from '#/pages/Private/Recourse/components/Progress/adapters/ProgressAdapter';
import {
  type ProgressSuccessResponse,
  type ProgressErrorResponse,
  type ProgressesSuccessResponse
} from '#/pages/Private/Recourse/components/Progress/indext.types';
import { processErrorResponse } from '#/utilities/processAPIResponse.util';
import Cookies from 'js-cookie';

export const getProgressPerRecourse = async (
  recourseId: number,
  page: number
): Promise<ProgressesSuccessResponse | ProgressErrorResponse> => {
  // TODO Extraer esta logica de verificacion del bearerToken
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

  return await fetch(
    `${
      import.meta.env.VITE_BACKEND_ENDPOINT
    }/v1/recourses/${recourseId}/progress?page=${page}&perPage=5`,
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
    .then(async (data) => progressesAdapter(await data))
    .catch(async (error) => progressErrorResponseAdapter(processErrorResponse(await error)));
};

export const savingProgress = async (
  progress: any,
  recourseId: number
): Promise<ProgressSuccessResponse | ProgressErrorResponse> => {
  // TODO Extraer esta logica de verificacion del bearerToken
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

  return await fetch(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${recourseId}/progress`,
    {
      method: 'POST',
      body: JSON.stringify(progress),
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
    .then(async (data) => progressAdapter(await data))
    .catch(async (error) => progressErrorResponseAdapter(processErrorResponse(await error)));
};

export const destroyProgress = async (
  progress: Progress
): Promise<ProgressSuccessResponse | ProgressErrorResponse> => {
  // TODO Extraer esta logica de verificacion del bearerToken
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/progress/${progress.id}`, {
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
    .then(async (data) => progressAdapter(await data))
    .catch(async (error) => progressErrorResponseAdapter(processErrorResponse(await error)));
};
