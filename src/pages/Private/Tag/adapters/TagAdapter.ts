import { type TagErrorResponse, type TagsSuccessResponse } from '../index.types';

interface ApiResponseTag {
  identificador: string;
  nombre: string;
  estilos: string;
}
const adapterTagData = (tags: ApiResponseTag[]): Tag[] => {
  return tags.map((tag: ApiResponseTag) => ({
    id: parseInt(tag.identificador),
    name: tag.nombre,
    style: tag.estilos
  }));
};

export const tagsAdapter = (response: any): TagsSuccessResponse => {
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
    data: adapterTagData(response.data)
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
