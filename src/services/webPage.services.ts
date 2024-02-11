import {
  webPageAdapter,
  webPageErrorResponseAdapter,
  webPagePaginatedErrorResponseAdapter,
  webPagesPaginatedAdapter
} from '#/pages/Private/WebPage/adapters/WebPageAdapter';
import {
  type WebPagePaginatedErrorResponse,
  type WebPagesPaginatedSuccessResponse,
  type WebPageErrorResponse,
  type WebPageSuccessResponse,
  type WebPageRequestBody
} from '#/pages/Private/WebPage/index.types';
import { getBearerToken } from '#/utilities/authenticationManagement';
import { processErrorResponse } from '#/utilities/processAPIResponse.util';

export const getWebPages = async (
  queryParams: string
): Promise<WebPagesPaginatedSuccessResponse | WebPagePaginatedErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/webpage?${queryParams}`, {
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
    .then(async (data) => webPagesPaginatedAdapter(await data))
    .catch(async (error) =>
      webPagePaginatedErrorResponseAdapter(processErrorResponse(await error))
    );
};

export const savingWebPage = async (
  webpage: WebPageRequestBody
): Promise<WebPageSuccessResponse | WebPageErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/webpage`, {
    method: 'POST',
    body: JSON.stringify(webpage),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
  })
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());
      return await resp.json();
    })
    .then(async (data) => webPageAdapter(await data))
    .catch(async (error) => webPageErrorResponseAdapter(processErrorResponse(await error)));
};

export const updatingWebPage = async (
  webpage: WebPageRequestBody
): Promise<WebPageSuccessResponse | WebPageErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/webpage/${webpage.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...webpage,
      identificador: webpage.id
    }),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
  })
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());
      return await resp.json();
    })
    .then(async (data) => webPageAdapter(await data))
    .catch(async (error) => webPageErrorResponseAdapter(processErrorResponse(await error)));
};

export const destroyWebPage = async (
  webPage: WebPage
): Promise<WebPageSuccessResponse | WebPageErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/webpage/${webPage.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
  })
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());

      return await resp.json();
    })
    .then(async (data) => webPageAdapter(await data))
    .catch(async (error) => webPageErrorResponseAdapter(processErrorResponse(await error)));
};
