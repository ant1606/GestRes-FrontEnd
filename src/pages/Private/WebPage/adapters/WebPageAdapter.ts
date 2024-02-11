import { adapterTagsData } from '../../Tag/adapters/TagAdapter';
import {
  type WebPageSuccessResponse,
  type ApiResponseWebPage,
  type WebPagesPaginatedSuccessResponse,
  type WebPagePaginatedErrorResponse,
  type WebPageErrorResponse,
  type ApiResponseSuccessWebPage
} from '../index.types';

export const webPagesPaginatedAdapter = (response: any): WebPagesPaginatedSuccessResponse => {
  if (response.data.length === 0)
    return {
      status: response.status,
      code: response.code,
      data: [],
      meta: null,
      links: null
    };

  return {
    status: response.status,
    code: response.code,
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
    data: adapterWebPagesData(response.data)
  };
};

export const webPagePaginatedErrorResponseAdapter = (error: any): WebPagePaginatedErrorResponse => {
  return {
    status: error.status,
    code: error.code,
    message: error.message,
    details: {
      searchNombre: error.details.searchNombre ?? null,
      searchTags: error.details.searchTags ?? null
    }
  };
};

export const adapterWebPage = (webPage: ApiResponseWebPage): WebPage => {
  return {
    id: webPage.identificador,
    name: webPage.nombre,
    url: webPage.url,
    description: webPage.descripcion,
    countVisits: webPage.totalVisitas,
    tags: adapterTagsData(webPage.tags)
  };
};

export const webPageAdapter = (webPage: ApiResponseSuccessWebPage): WebPageSuccessResponse => {
  return {
    code: webPage.code,
    status: webPage.status,
    data: adapterWebPage(webPage.data)
  };
};

export const webPageErrorResponseAdapter = (error: any): WebPageErrorResponse => {
  return {
    status: error.status,
    message: error.message,
    code: error.code,
    details: {
      name: error.details.name ?? null,
      url: error.details.url ?? null,
      description: error.details.description ?? null
    }
  };
};

export const adapterWebPagesData = (webPages: ApiResponseWebPage[]): WebPage[] => {
  return webPages?.map((webPage: ApiResponseWebPage) => adapterWebPage(webPage));
};
