import {
  registerErrorResponseAdapter,
  registerSuccessResponseAdapter
} from '@/pages/Register/adapters/RegisterAdapter';
import {
  type RegisterFormData,
  type RegisterErrorResponse,
  type RegisterSuccessResponse
} from '@/pages/Register/index.types';
import { processErrorResponse } from '@/utilities/processAPIResponse.util';

export const savingUser = async (
  registerUserData: RegisterFormData
): Promise<RegisterSuccessResponse | RegisterErrorResponse> => {
  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      ...registerUserData,
      password_confirmation: registerUserData.passwordConfirmation
    })
  })
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then(async (data) => registerSuccessResponseAdapter(await data))
    .catch(async (error) => registerErrorResponseAdapter(processErrorResponse(await error)));
};
