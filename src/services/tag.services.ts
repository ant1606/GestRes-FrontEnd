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
import { type FetchWithSessionHandlingType } from '../hooks/useFetch';

export const getTags = async (
  queryParams: string,
  fetchCallback: FetchWithSessionHandlingType
): Promise<TagsPaginatedSuccessResponse | TagPaginatedErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag?${queryParams}`;
  const response = await fetchCallback(url, 'GET');
  return response.status === 'success'
    ? tagsPaginatedAdapter(response)
    : tagsErrorPaginatedAdapter(response);
};

export const getTagsForTagSelector = async (
  fetchCallback: FetchWithSessionHandlingType
): Promise<TagsSelectorSuccessResponse | TagErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag/getTagsForTagSelector`;
  const response = await fetchCallback(url, 'GET');
  return response.status === 'success' ? response : tagErrorResponseAdapter(response);
};

export const savingTag = async (
  tag: Tag,
  fetchCallback: FetchWithSessionHandlingType
): Promise<TagSuccessResponse | TagErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag`;
  const response = await fetchCallback(url, 'POST', JSON.stringify(tag));
  return response.status === 'success' ? tagAdapter(response) : tagErrorResponseAdapter(response);
};

export const updatingTag = async (
  tag: Tag,
  fetchCallback: FetchWithSessionHandlingType
): Promise<TagSuccessResponse | TagErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag/${tag.id}`;
  const body = JSON.stringify({
    ...tag,
    identificador: tag.id
  });
  const response = await fetchCallback(url, 'PUT', body);
  return response.status === 'success' ? tagAdapter(response) : tagErrorResponseAdapter(response);
};

export const destroyTag = async (
  tag: Tag,
  fetchCallback: FetchWithSessionHandlingType
): Promise<TagSuccessResponse | TagErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/tag/${tag.id}`;
  const response = await fetchCallback(url, 'DELETE');
  return response.status === 'success' ? tagAdapter(response) : tagErrorResponseAdapter(response);
};
