import {
  recourseAdapter,
  recourseErrorResponseAdapter
} from './../pages/Private/Recourse/adapters/RecourseAdapter';
import { recoursesAdapter } from '#/pages/Private/Recourse/adapters/RecourseAdapter';
import {
  type RecourseSuccessResponse,
  type RecourseErrorResponse,
  type RecoursesSuccessResponse
} from '#/pages/Private/Recourse/index.types';
import { processErrorResponse } from '#/utilities/processAPIResponse.util';
import Cookies from 'js-cookie';

export const getRecourses = async (
  queryParams: string
): Promise<RecoursesSuccessResponse | RecourseErrorResponse> => {
  // TODO Extraer esta logica de verificacion del bearerToken
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses?${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  })
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then(async (data) => recoursesAdapter(await data))
    .catch(async (error) => recourseErrorResponseAdapter(processErrorResponse(await error)));
};

export const getRecourse = async (
  id: number
): Promise<RecourseSuccessResponse | RecourseErrorResponse> => {
  // TODO Extraer esta logica de verificacion del bearerToken
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  })
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then(async (data) => recourseAdapter(await data))
    .catch(async (error) => recourseErrorResponseAdapter(processErrorResponse(await error)));
};

export const savingRecourse = async (
  recourse: any
): Promise<RecourseSuccessResponse | RecourseErrorResponse> => {
  // TODO Extraer esta logica de verificacion del bearerToken
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses`, {
    method: 'POST',
    body: JSON.stringify(recourse),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  })
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());
      return await resp.json();
    })
    .then(async (data) => recourseAdapter(await data))
    .catch(async (error) => recourseErrorResponseAdapter(processErrorResponse(await error)));
};

export const updatingRecourse = async (
  recourse: any
): Promise<RecourseSuccessResponse | RecourseErrorResponse> => {
  // TODO Extraer esta logica de verificacion del bearerToken
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

  return await fetch(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${recourse.recourse_id}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        ...recourse,
        identificador: recourse.id
      }),
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      }
    }
  )
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());
      return await resp.json();
    })
    .then(async (data) => recourseAdapter(await data))
    .catch(async (error) => recourseErrorResponseAdapter(processErrorResponse(await error)));
};

export const destroyRecourse = async (
  recourse: Recourse
): Promise<RecourseSuccessResponse | RecourseErrorResponse> => {
  // TODO Extraer esta logica de verificacion del bearerToken
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${recourse.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  })
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());

      return await resp.json();
    })
    .then(async (data) => recourseAdapter(await data))
    .catch(async (error) => recourseErrorResponseAdapter(processErrorResponse(await error)));
};
