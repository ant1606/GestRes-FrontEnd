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
import { processErrorResponse } from '#/utilities/processAPIResponse.util';
import { getBearerToken } from '#/utilities/authenticationManagement';

export const getRecourses = async (
  queryParams: string
): Promise<RecoursesPaginatedSuccessResponse | RecoursePaginatedErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses?${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
  })
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then(async (data) => recoursesPaginatedAdapter(await data))
    .catch(async (error) =>
      recoursePaginatedErrorResponseAdapter(processErrorResponse(await error))
    );
};

export const getRecourse = async (
  id: number
): Promise<RecourseSuccessResponse | RecourseErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
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
  recourse: RecourseRequestBody
): Promise<RecourseSuccessResponse | RecourseErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses`, {
    method: 'POST',
    body: JSON.stringify(recourse),
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
    .then(async (data) => recourseAdapter(await data))
    .catch(async (error) => recourseErrorResponseAdapter(processErrorResponse(await error)));
};

export const updatingRecourse = async (
  recourse: RecourseRequestBody
): Promise<RecourseSuccessResponse | RecourseErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${recourse.recourse_id}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        ...recourse
      }),
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
    .then(async (data) => recourseAdapter(await data))
    .catch(async (error) => recourseErrorResponseAdapter(processErrorResponse(await error)));
};

export const destroyRecourse = async (
  recourse: Recourse
): Promise<RecourseSuccessResponse | RecourseErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses/${recourse.id}`, {
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
    .then(async (data) => recourseAdapter(await data))
    .catch(async (error) => recourseErrorResponseAdapter(processErrorResponse(await error)));
};
