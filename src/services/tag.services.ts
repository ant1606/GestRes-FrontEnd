import {
  tagAdapter,
  tagErrorResponseAdapter,
  tagsErrorPaginatedAdapter,
  tagsPaginatedAdapter
} from '#/pages/Private/Tag/adapters/TagAdapter';
import {
  type TagSuccessResponse,
  type TagErrorResponse,
  type TagsPaginatedSuccessResponse,
  type TagsSelectorSuccessResponse,
  type TagPaginatedErrorResponse
} from '#/pages/Private/Tag/index.types';
import { getBearerToken } from '#/utilities/authenticationManagement';
import { processErrorResponse } from '#/utilities/processAPIResponse.util';

export const getTags = async (
  queryParams: string
): Promise<TagsPaginatedSuccessResponse | TagPaginatedErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag?${queryParams}`, {
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
    .then(async (data) => tagsPaginatedAdapter(await data))
    .catch(async (error) => tagsErrorPaginatedAdapter(processErrorResponse(await error)));
};

export const getTagsForTagSelector = async (): Promise<
  TagsSelectorSuccessResponse | TagErrorResponse
> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag/getTagsForTagSelector`, {
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
    .then(async (data) => data)
    .catch(async (error) => tagErrorResponseAdapter(processErrorResponse(await error)));
};

export const savingTag = async (tag: Tag): Promise<TagSuccessResponse | TagErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag`, {
    method: 'POST',
    body: JSON.stringify(tag),
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
    .then(async (data) => tagAdapter(await data))
    .catch(async (error) => tagErrorResponseAdapter(processErrorResponse(await error)));
};

export const updatingTag = async (tag: Tag): Promise<TagSuccessResponse | TagErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag/${tag.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...tag,
      identificador: tag.id
    }),
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
    .then(async (data) => tagAdapter(await data))
    .catch(async (error) => tagErrorResponseAdapter(processErrorResponse(await error)));
};

export const destroyTag = async (tag: Tag): Promise<TagSuccessResponse | TagErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag/${tag.id}`, {
    method: 'delete',
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
    .then(async (data) => tagAdapter(await data))
    .catch(async (error) => tagErrorResponseAdapter(processErrorResponse(await error)));
};
