import {
  resendLinkVerifyEmailErrorResponseAdapter,
  resendLinkVerifyEmailSuccessResponseAdapter
} from '@/pages/Private/ResendVerifyLinkEmail/adapters/resendLinkVerifyEmailAdapter';
import {
  verifyEmailErrorResponseAdapter,
  verifyEmailSuccessResponseAdapter
} from '@/pages/VerifyEmail/adapters/VerifyEmailAdapter';
import { processErrorResponse } from '@/utilities/processAPIResponse.util';
import Cookies from 'js-cookie';

export const verifyUserEmail = async (
  id: string,
  hash: string
): Promise<Record<string, string | any>> => {
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
): Promise<Record<string, string | any>> => {
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

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
