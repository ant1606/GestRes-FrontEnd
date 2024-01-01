import { adapterTagsData } from '../../Tag/adapters/TagAdapter';
import {
  type WebPageSuccessResponse,
  type ApiResponseWebPage,
  type WebPagesSuccessResponse,
  type WebPageErrorResponse
} from '../index.types';

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

export const webPageAdapter = (webPage: ApiResponseWebPage): WebPageSuccessResponse => {
  return {
    data: adapterWebPage(webPage)
  };
};

export const adapterWebPagesData = (webPages: ApiResponseWebPage[]): WebPage[] => {
  return webPages?.map((webPage: ApiResponseWebPage) => adapterWebPage(webPage));
};

export const webPagesAdapter = (response: any): WebPagesSuccessResponse => {
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
    data: adapterWebPagesData(response.data)
  };
};

export const webPageErrorResponseAdapter = (error: any): WebPageErrorResponse => {
  return {
    error: {
      status: error.error.status.toString(),
      detail: {
        apiResponseMessageError: error.error.detail.api_response ?? null,
        url: error.error.detail.url ?? null,
        name: error.error.detail.name ?? null,
        description: error.error.detail.description ?? null
      }
    }
  };
};
