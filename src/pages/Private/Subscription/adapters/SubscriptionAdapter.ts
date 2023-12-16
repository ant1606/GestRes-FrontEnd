import {
  type YoutubeSubscriptionErrorResponse,
  type YoutubeSubscriptionsSuccessResponse
} from './../index.types';
import {
  type ApiResponseYoutubeSubscription,
  type YoutubeSubscriptionSuccessResponse
} from '../index.types';

export const youtubeSubscriptionAdapter = (
  response: ApiResponseYoutubeSubscription
): YoutubeSubscriptionSuccessResponse => {
  return {
    data: {
      id: response.identificador,
      channel_id: response.canalId,
      description: response.descripcion,
      published_at: response.fechaSubscripcion,
      thumbnail_default: response.fotoDefault,
      thumbnail_hig: response.fotoHigh,
      thumbnail_medium: response.fotoMedium,
      title: response.titulo,
      user_id: parseInt(response.usuarioId)
    }
  };
};

export const adapterYoutubeSubscriptionsData = (
  youtubeSubscriptions: ApiResponseYoutubeSubscription[]
): YoutubeSubscription[] => {
  return youtubeSubscriptions?.map((subscription: ApiResponseYoutubeSubscription) => ({
    id: subscription.identificador,
    channel_id: subscription.canalId,
    description: subscription.descripcion,
    published_at: subscription.fechaSubscripcion,
    thumbnail_default: subscription.fotoDefault,
    thumbnail_hig: subscription.fotoHigh,
    thumbnail_medium: subscription.fotoMedium,
    title: subscription.titulo,
    user_id: parseInt(subscription.usuarioId)
  }));
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
