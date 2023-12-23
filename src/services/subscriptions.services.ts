import {
  youtubeSubscriptionsAdapter,
  youtubeSubscriptionErrorResponseAdapter,
  youtubeSubscriptionAdapter
} from '#/pages/Private/Subscription/adapters/SubscriptionAdapter';
import {
  type YoutubeSubscriptionsSuccessResponse,
  type YoutubeSubscriptionErrorResponse,
  type YoutubeSubscriptionSuccessResponse
} from '#/pages/Private/Subscription/index.types';
import { getBearerToken } from '#/utilities/authenticationManagement';
import { processErrorResponse } from '#/utilities/processAPIResponse.util';

export const getSubscriptions = async (
  queryParams: string
): Promise<YoutubeSubscriptionsSuccessResponse | YoutubeSubscriptionErrorResponse> => {
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
    .then(async (data) => youtubeSubscriptionsAdapter(await data))
    .catch(async (error) =>
      youtubeSubscriptionErrorResponseAdapter(processErrorResponse(await error))
    );
};

export const savingSubscriptions = async (accessToken: string): Promise<void> => {
  const bearerToken = getBearerToken();

  fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/youtube-subscription`, {
    method: 'POST',
    body: JSON.stringify({ access_token: accessToken }),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
  });
};

export const updatingSubscription = async (
  subscription: any
): Promise<YoutubeSubscriptionSuccessResponse | YoutubeSubscriptionErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/youtube-subscription/${subscription.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        ...subscription,
        identificador: subscription.id
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
