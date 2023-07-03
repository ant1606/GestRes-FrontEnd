import {
  loginErrorResponseAdapter,
  loginSuccessResponseAdapter
} from '@/pages/Login/adapters/LoginAdapter';
import { processErrorResponse } from '@/utilities/processAPIResponse.util';

interface LoginCredentials {
  email: string;
  password: string;
  remember_me: boolean;
}

export const logginUser = async (
  credentials: LoginCredentials
): Promise<Record<string, string | any>> => {
  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then(async (data) => loginSuccessResponseAdapter(await data))
    .catch(async (error) => loginErrorResponseAdapter(processErrorResponse(await error)));
  // .catch(async (error) => processErrorResponse(await error));
};
