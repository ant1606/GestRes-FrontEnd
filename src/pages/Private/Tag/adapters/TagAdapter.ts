import {
  type TagSuccessResponse,
  type ApiResponseTag,
  type TagErrorResponse,
  type TagsPaginatedSuccessResponse,
  type TagPaginatedErrorResponse,
  type ApiResponseSuccessTag
} from '../index.types';

export const adapterTagsData = (tags: ApiResponseTag[]): Tag[] => {
  return tags?.map((tag: ApiResponseTag) => ({
    id: parseInt(tag.identificador),
    name: tag.nombre,
    style: tag.estilos,
    total: tag.total
  }));
};

export const tagsPaginatedAdapter = (response: any): TagsPaginatedSuccessResponse => {
  if (response.data.length === 0) {
    return {
      status: response.status,
      code: response.code,
      data: [],
      meta: null,
      links: null
    };
  }
  return {
    status: response.status,
    code: response.code,
    meta: {
      path: response.meta?.path,
      currentPage: response.meta?.currentPage,
      perPage: response.meta?.perPage,
      totalPages: response.meta?.totalPages,
      from: response.meta?.from,
      to: response.meta?.to,
      total: response.meta?.total
    },
    links: {
      self: response.links?.self,
      first: response.links?.first,
      last: response.links?.last,
      next: response.links?.next,
      prev: response.links?.prev
    },
    data: adapterTagsData(response.data)
  };
};

export const tagsErrorPaginatedAdapter = (error: any): TagPaginatedErrorResponse => {
  return {
    status: error.status,
    message: error.message,
    code: error.code,
    details: {
      searchNombre: error.details.searchNombre ?? null,
      sortNombre: error.details.sortNombre ?? null
    }
  };
};

export const tagAdapter = (response: ApiResponseSuccessTag): TagSuccessResponse => {
  return {
    status: response.status,
    code: response.code,
    data: {
      id: parseInt(response.data.identificador),
      name: response.data.nombre,
      style: response.data.estilos,
      total: response.data.total
    }
  };
};

export const tagErrorResponseAdapter = (error: any): TagErrorResponse => {
  return {
    status: error.status,
    message: error.message,
    code: error.code,
    details: {
      name: error.details.name ?? null
    }
  };
};
