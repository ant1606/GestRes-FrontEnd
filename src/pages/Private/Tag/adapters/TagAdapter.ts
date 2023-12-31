import {
  type TagSuccessResponse,
  type ApiResponseTag,
  type TagErrorResponse,
  type TagsSuccessResponse
} from '../index.types';

export const adapterTagsData = (tags: ApiResponseTag[]): Tag[] => {
  return tags?.map((tag: ApiResponseTag) => ({
    id: parseInt(tag.identificador),
    name: tag.nombre,
    style: tag.estilos,
    total: tag.total
  }));
};

export const tagAdapter = (response: ApiResponseTag): TagSuccessResponse => {
  return {
    data: {
      id: parseInt(response.identificador),
      name: response.nombre,
      style: response.estilos,
      total: response.total
    }
  };
};

export const tagsAdapter = (response: any): TagsSuccessResponse => {
  if (response.data.length === 0) return { meta: null, links: null, data: [] };
  return {
    meta: {
      path: response.meta.path,
      currentPage: response.meta.currentPage,
      perPage: response.meta.perPage,
      totalPages: response.meta.totalPages,
      from: response.meta.from,
      to: response.meta.to,
      total: response.meta.total
    },
    links: {
      self: response.links.self,
      first: response.links.first,
      last: response.links.last,
      next: response.links.next,
      prev: response.links.prev
    },
    data: adapterTagsData(response.data)
  };
};

export const tagErrorResponseAdapter = (error: any): TagErrorResponse => {
  return {
    error: {
      status: error.error.status,
      detail: {
        apiResponseMessageError: error.error.detail.api_response ?? null,
        name: error.error.detail.name ?? null
      }
    }
  };
};
