import { processErrorResponse } from '@/utilities/processAPIResponse.util';
import {
  passwordForgetErrorResponseAdapter,
  passwordForgetSuccessResponseAdapter
} from '@/pages/PasswordForget/adapters/PasswordForgetAdapter';
import {
  type PasswordForgetErrorResponse,
  type PasswordForgetSuccessResponse
} from '@/pages/PasswordForget/index.types';

export const passwordForget = async (
  email: string
): Promise<PasswordForgetSuccessResponse | PasswordForgetErrorResponse> => {
  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({ email })
  })
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then(async (data) => passwordForgetSuccessResponseAdapter(await data))
    .catch(async (error) => passwordForgetErrorResponseAdapter(processErrorResponse(await error)));
};
