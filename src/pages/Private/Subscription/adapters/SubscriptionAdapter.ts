import {
  type YoutubeSubscriptionErrorResponse,
  type YoutubeSubscriptionsSuccessResponse
} from './../index.types';
import {
  type ApiResponseYoutubeSubscription,
  type YoutubeSubscriptionSuccessResponse
} from '../index.types';
import { adapterTagsData } from '../../Tag/adapters/TagAdapter';

// TODO Analizar estos adapters contra el RecourseAdapter
export const youtubeSubscriptionAdapter = (
  response: ApiResponseYoutubeSubscription
): YoutubeSubscriptionSuccessResponse => {
  return {
    data: {
      id: parseInt(response.identificador),
      youtubeId: response.youtubeId,
      channelId: response.canalId,
      description: response.descripcion,
      publishedAt: response.fechaSubscripcion,
      thumbnailDefault: response.fotoDefault,
      thumbnailHigh: response.fotoHigh,
      thumbnailMedium: response.fotoMedium,
      title: response.titulo,
      tags: adapterTagsData(response.tags),
      userId: parseInt(response.usuarioId)
    }
  };
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

export const adapterYoutubeSubscriptionsData = (
  youtubeSubscriptions: ApiResponseYoutubeSubscription[]
): YoutubeSubscription[] => {
  return youtubeSubscriptions?.map((subscription: ApiResponseYoutubeSubscription) =>
    adapterYoutubeSubscription(subscription)
  );
};

export const youtubeSubscriptionsAdapter = (response: any): YoutubeSubscriptionsSuccessResponse => {
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
    data: adapterYoutubeSubscriptionsData(response.data)
  };
};

export const youtubeSubscriptionErrorResponseAdapter = (
  error: any
): YoutubeSubscriptionErrorResponse => {
  return {
    error: {
      status: error.error.status.toString(),
      detail: {
        apiResponseMessageError: error.error.detail.api_response ?? null,
        message: error.error.detail.message ?? null
      }
    }
  };
};
