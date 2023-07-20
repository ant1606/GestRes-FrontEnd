import {
  tagAdapter,
  tagErrorResponseAdapter,
  tagsAdapter
} from '@/pages/Private/Tag/adapters/TagAdapter';
import {
  type TagSuccessResponse,
  type TagErrorResponse,
  type TagsSuccessResponse
} from '@/pages/Private/Tag/index.types';
import { processErrorResponse } from '@/utilities/processAPIResponse.util';
import Cookies from 'js-cookie';

export const getTags = async (
  queryParams: string
): Promise<TagsSuccessResponse | TagErrorResponse> => {
  // TODO Extraer esta logica de verificacion del bearerToken
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag?${queryParams}`, {
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
    .then(async (data) => tagsAdapter(await data))
    .catch(async (error) => tagErrorResponseAdapter(processErrorResponse(await error)));
};

export const savingTag = async (tag: Tag): Promise<TagSuccessResponse | TagErrorResponse> => {
  // TODO Extraer esta logica de verificacion del bearerToken
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag`, {
    method: 'POST',
    body: JSON.stringify(tag),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  })
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());
      return await resp.json();
    })
    .then(async (data) => tagAdapter(await data))
    .catch(async (error) => tagErrorResponseAdapter(processErrorResponse(await error)));
};

export const updatingTag = async (tag: Tag): Promise<TagSuccessResponse | TagErrorResponse> => {
  // TODO Extraer esta logica de verificacion del bearerToken
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag/${tag.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...tag,
      identificador: tag.id
    }),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  })
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());
      return await resp.json();
    })
    .then(async (data) => tagAdapter(await data))
    .catch(async (error) => tagErrorResponseAdapter(processErrorResponse(await error)));
};
