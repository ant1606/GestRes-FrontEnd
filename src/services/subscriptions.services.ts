import {
  type YoutubeSubscriptionsPaginatedErrorResponse,
  type YoutubeSubscriptionErrorResponse,
  type YoutubeSubscriptionsPaginatedSuccessResponse,
  type YoutubeSubscriptionSuccessResponse
} from './../pages/Private/Subscription/index.types';
import {
  youtubeSubscriptionErrorResponseAdapter,
  youtubeSubscriptionAdapter,
  youtubeSubscriptionsPaginatedAdapter,
  youtubeSubscriptionsPaginatedErrorResponseAdapter
} from '#/pages/Private/Subscription/adapters/SubscriptionAdapter';
import {
  type fetchWithoutReturnHandlingType,
  type FetchWithSessionHandlingType
} from '#/hooks/useFetch';

export const getSubscriptions = async (
  queryParams: string,
  fetchCallback: FetchWithSessionHandlingType
): Promise<
  YoutubeSubscriptionsPaginatedSuccessResponse | YoutubeSubscriptionsPaginatedErrorResponse
> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/youtube-subscription?${queryParams}`;
  const response = await fetchCallback(url, 'GET');
  return response.status === 'success'
    ? youtubeSubscriptionsPaginatedAdapter(response)
    : youtubeSubscriptionsPaginatedErrorResponseAdapter(response);
};

export const importSubscriptions = async (
  accessToken: string,
  order: string,
  fetchCallback: fetchWithoutReturnHandlingType
): Promise<void> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/youtube-subscription`;
  const body = JSON.stringify({ access_token: accessToken, order });
  fetchCallback(url, 'POST', body);
};

export const updatingSubscription = async (
  subscriptionId: number,
  tags: number[],
  fetchCallback: FetchWithSessionHandlingType
): Promise<YoutubeSubscriptionSuccessResponse | YoutubeSubscriptionErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/youtube-subscription/${subscriptionId}`;
  const body = JSON.stringify({
    tags
  });
  const response = await fetchCallback(url, 'PUT', body);
  return response.status === 'success'
    ? youtubeSubscriptionAdapter(response)
    : youtubeSubscriptionErrorResponseAdapter(response);
};

export const destroySubscription = async (
  youtubeSubscription: YoutubeSubscription,
  fetchCallback: FetchWithSessionHandlingType
): Promise<YoutubeSubscriptionSuccessResponse | YoutubeSubscriptionErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/youtube-subscription/${
    youtubeSubscription.id
  }`;
  const response = await fetchCallback(url, 'DELETE');
  return response.status === 'success'
    ? youtubeSubscriptionAdapter(response)
    : youtubeSubscriptionErrorResponseAdapter(response);
};

export const getStatusProcess = async (
  fetchCallback: FetchWithSessionHandlingType
): Promise<string | YoutubeSubscriptionErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/youtube-subscription`;
  const response = await fetchCallback(url, 'GET');
  return response.status === 'success'
    ? response
    : youtubeSubscriptionErrorResponseAdapter(response);
};
