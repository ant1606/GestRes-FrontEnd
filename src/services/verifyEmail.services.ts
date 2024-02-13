import {
  resendLinkVerifyEmailErrorResponseAdapter,
  resendLinkVerifyEmailSuccessResponseAdapter
} from '#/pages/Private/ResendVerifyLinkEmail/adapters/resendLinkVerifyEmailAdapter';
import {
  type ResendLinkVerifyEmailErrorResponse,
  type ResendLinkVerifyEmailSuccessResponse
} from '#/pages/Private/ResendVerifyLinkEmail/index.types';
import {
  verifyEmailErrorResponseAdapter,
  verifyEmailSuccessResponseAdapter
} from '#/pages/VerifyEmail/adapters/VerifyEmailAdapter';
import {
  type VerifyEmailErrorResponse,
  type VerifyEmailSuccessResponse
} from '#/pages/VerifyEmail/index.types';
import { getBearerToken } from '#/utilities/authenticationManagement';
import { processErrorResponse } from '#/utilities/processAPIResponse.util';

export const verifyUserEmail = async (
  id: string,
  hash: string
): Promise<VerifyEmailSuccessResponse | VerifyEmailErrorResponse> => {
  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/email/verify/${id}/${hash}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  })
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then(async (data) => verifyEmailSuccessResponseAdapter(await data))
    .catch(async (error) => verifyEmailErrorResponseAdapter(processErrorResponse(await error)));
};

export const resendLinkVerifyUserEmail = async (
  id: number
): Promise<ResendLinkVerifyEmailSuccessResponse | ResendLinkVerifyEmailErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/email/verification-notification`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${bearerToken}`
      },
      body: JSON.stringify({
        id
      })
    }
  )
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then(async (data) => resendLinkVerifyEmailSuccessResponseAdapter(await data))
    .catch(async (error) =>
      resendLinkVerifyEmailErrorResponseAdapter(processErrorResponse(await error))
    );
};
