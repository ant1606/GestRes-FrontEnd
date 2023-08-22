import { processErrorResponse } from '@/utilities/processAPIResponse.util';
import {
  passwordResetErrorResponseAdapter,
  passwordResetSuccessResponseAdapter
} from './../pages/PasswordReset/adapters/PasswordResetAdapter';
import {
  type PasswordResetErrorResponse,
  type PasswordResetSuccessResponse
} from '@/pages/PasswordReset/index.types';

interface PasswordResetData {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

export const passwordReset = async (
  data: PasswordResetData
): Promise<PasswordResetSuccessResponse | PasswordResetErrorResponse> => {
  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then(async (data) => passwordResetSuccessResponseAdapter(await data))
    .catch(async (error) => passwordResetErrorResponseAdapter(processErrorResponse(await error)));
};
