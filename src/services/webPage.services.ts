import { type FetchWithSessionHandlingType } from '#/hooks/useFetch';
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

export const getWebPages = async (
  queryParams: string,
  fetchCallback: FetchWithSessionHandlingType
): Promise<WebPagesPaginatedSuccessResponse | WebPagePaginatedErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/webpage?${queryParams}`;
  const response = await fetchCallback(url, 'GET');
  return response.status === 'success'
    ? webPagesPaginatedAdapter(response)
    : webPagePaginatedErrorResponseAdapter(response);
};

export const savingWebPage = async (
  webpage: WebPageRequestBody,
  fetchCallback: FetchWithSessionHandlingType
): Promise<WebPageSuccessResponse | WebPageErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/webpage`;
  const response = await fetchCallback(url, 'POST', JSON.stringify(webpage));
  return response.status === 'success'
    ? webPageAdapter(response)
    : webPageErrorResponseAdapter(response);
};

export const updatingWebPage = async (
  webpage: WebPageRequestBody,
  fetchCallback: FetchWithSessionHandlingType
): Promise<WebPageSuccessResponse | WebPageErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/webpage/${webpage.id}`;
  const body = JSON.stringify({
    ...webpage,
    identificador: webpage.id
  });
  const response = await fetchCallback(url, 'PUT', body);
  return response.status === 'success'
    ? webPageAdapter(response)
    : webPageErrorResponseAdapter(response);
};

export const destroyWebPage = async (
  webPage: WebPage,
  fetchCallback: FetchWithSessionHandlingType
): Promise<WebPageSuccessResponse | WebPageErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/webpage/${webPage.id}`;
  const response = await fetchCallback(url, 'DELETE');
  return response.status === 'success'
    ? webPageAdapter(response)
    : webPageErrorResponseAdapter(response);
};
