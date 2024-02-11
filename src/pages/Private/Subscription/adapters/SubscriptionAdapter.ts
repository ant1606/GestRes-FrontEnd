import {
  type YoutubeSubscriptionsPaginatedSuccessResponse,
  type YoutubeSubscriptionErrorResponse,
  type YoutubeSubscriptionsPaginatedErrorResponse,
  type ApiResponseSuccessYoutubeSubscription
} from './../index.types';
import {
  type ApiResponseYoutubeSubscription,
  type YoutubeSubscriptionSuccessResponse
} from '../index.types';
import { adapterTagsData } from '../../Tag/adapters/TagAdapter';

/** PAGINACIÓN **/
export const youtubeSubscriptionsPaginatedAdapter = (
  response: any
): YoutubeSubscriptionsPaginatedSuccessResponse => {
  if (response.data.length === 0)
    return {
      status: response.status,
      code: response.code,
      meta: null,
      links: null,
      data: []
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
    data: adapterYoutubeSubscriptionsData(response.data)
  };
};

export const youtubeSubscriptionsPaginatedErrorResponseAdapter = (
  error: any
): YoutubeSubscriptionsPaginatedErrorResponse => {
  return {
    status: error.status,
    code: error.code,
    message: error.message,
    details: {
      searchTags: error.details.searchTags ?? null,
      searchTitle: error.details.searchTitle ?? null
    }
  };
};

/** OBJETO **/
export const adapterYoutubeSubscriptionsData = (
  youtubeSubscriptions: ApiResponseYoutubeSubscription[]
): YoutubeSubscription[] => {
  return youtubeSubscriptions?.map((subscription: ApiResponseYoutubeSubscription) =>
    adapterYoutubeSubscription(subscription)
  );
};

const adapterYoutubeSubscription = (
  youtubeSubscription: ApiResponseYoutubeSubscription
): YoutubeSubscription => {
  return {
    id: parseInt(youtubeSubscription.identificador),
    youtubeId: youtubeSubscription.youtubeId,
    channelId: youtubeSubscription.canalId,
    description: youtubeSubscription.descripcion,
    publishedAt: youtubeSubscription.fechaSubscripcion,
    thumbnailDefault: youtubeSubscription.fotoDefault,
    thumbnailHigh: youtubeSubscription.fotoHigh,
    thumbnailMedium: youtubeSubscription.fotoMedium,
    title: youtubeSubscription.titulo,
    userId: parseInt(youtubeSubscription.usuarioId),
    tags: adapterTagsData(youtubeSubscription.tags)
  };
};

export const youtubeSubscriptionAdapter = (
  response: ApiResponseSuccessYoutubeSubscription
): YoutubeSubscriptionSuccessResponse => {
  return {
    code: response.code,
    status: response.status,
    data: {
      id: parseInt(response.data.identificador),
      youtubeId: response.data.youtubeId,
      channelId: response.data.canalId,
      description: response.data.descripcion,
      publishedAt: response.data.fechaSubscripcion,
      thumbnailDefault: response.data.fotoDefault,
      thumbnailHigh: response.data.fotoHigh,
      thumbnailMedium: response.data.fotoMedium,
      title: response.data.titulo,
      tags: adapterTagsData(response.data.tags),
      userId: parseInt(response.data.usuarioId)
    }
  };
};

export const youtubeSubscriptionErrorResponseAdapter = (
  error: any
): YoutubeSubscriptionErrorResponse => {
  return {
    code: error.code,
    status: error.status,
    message: error.message
    // details: {
    //   message: error.error.detail.message ?? null
    // }
  };
};
