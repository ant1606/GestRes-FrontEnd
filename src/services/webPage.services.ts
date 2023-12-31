import {
  webPageAdapter,
  webPageErrorResponseAdapter
} from '#/pages/Private/WebPage/adapters/WebPageAdapter';
import {
  type WebPageErrorResponse,
  type WebPageSuccessResponse
} from '#/pages/Private/WebPage/index.types';
import { getBearerToken } from '#/utilities/authenticationManagement';
import { processErrorResponse } from '#/utilities/processAPIResponse.util';

export const savingWebPage = async (
  webpage: any
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
