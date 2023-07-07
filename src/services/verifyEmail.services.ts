import {
  verifyEmailErrorResponseAdapter,
  verifyEmailSuccessResponseAdapter
} from '@/pages/VerifyEmail/adapters/VerifyEmailAdapter';
import { processErrorResponse } from '@/utilities/processAPIResponse.util';

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
