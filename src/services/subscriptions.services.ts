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
import { getBearerToken } from '#/utilities/authenticationManagement';
import { processErrorResponse } from '#/utilities/processAPIResponse.util';

export const getSubscriptions = async (
  queryParams: string
): Promise<
  YoutubeSubscriptionsPaginatedSuccessResponse | YoutubeSubscriptionsPaginatedErrorResponse
> => {
  const bearerToken = getBearerToken();

  return await fetch(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/youtube-subscription?${queryParams}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${bearerToken}`
      }
    }
  )
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then(async (data) => youtubeSubscriptionsPaginatedAdapter(await data))
    .catch(async (error) =>
      youtubeSubscriptionsPaginatedErrorResponseAdapter(processErrorResponse(await error))
    );
};

export const importSubscriptions = async (accessToken: string, order: string): Promise<void> => {
  const bearerToken = getBearerToken();

  fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/youtube-subscription`, {
    method: 'POST',
    body: JSON.stringify({ access_token: accessToken, order }),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
  });
};

export const updatingSubscription = async (
  subscriptionId: number,
  tags: number[]
): Promise<YoutubeSubscriptionSuccessResponse | YoutubeSubscriptionErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/youtube-subscription/${subscriptionId}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        tags
      }),
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${bearerToken}`
      }
    }
  )
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());
      return await resp.json();
    })
    .then(async (data) => youtubeSubscriptionAdapter(await data))
    .catch(async (error) =>
      youtubeSubscriptionErrorResponseAdapter(processErrorResponse(await error))
    );
};

export const destroySubscription = async (
  youtubeSubscription: YoutubeSubscription
): Promise<YoutubeSubscriptionSuccessResponse | YoutubeSubscriptionErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/youtube-subscription/${youtubeSubscription.id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${bearerToken}`
      }
    }
  )
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());

      return await resp.json();
    })
    .then(async (data) => youtubeSubscriptionAdapter(await data))
    .catch(async (error) =>
      youtubeSubscriptionErrorResponseAdapter(processErrorResponse(await error))
    );
};

export const getStatusProcess = async (): Promise<string | YoutubeSubscriptionErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/youtube-subscription`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
  })
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then((data) => data)
    .catch(async (error) =>
      youtubeSubscriptionErrorResponseAdapter(processErrorResponse(await error))
    );
};
