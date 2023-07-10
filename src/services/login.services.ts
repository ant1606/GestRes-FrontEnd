import {
  loginErrorResponseAdapter,
  loginSuccessResponseAdapter
} from '@/pages/Login/adapters/LoginAdapter';
import { type LoginSuccessResponse, type LoginErrorResponse } from '@/pages/Login/index.types';
import { processErrorResponse } from '@/utilities/processAPIResponse.util';
import fetch from 'cross-fetch';
import Cookies from 'js-cookie';

interface LoginCredentials {
  email: string;
  password: string;
  remember_me: boolean;
}

export const logginUser = async (
  credentials: LoginCredentials
): Promise<LoginSuccessResponse | LoginErrorResponse> => {
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
};

export const refreshUserFromRememberToken = async (
  rememberToken: string | null
): Promise<LoginSuccessResponse | LoginErrorResponse> => {
  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/remember`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      remember_me: rememberToken
    })
  })
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then(async (data) => loginSuccessResponseAdapter(await data))
    .catch(async (error) => loginErrorResponseAdapter(processErrorResponse(await error)));
};

export const loggoutUser = async (): Promise<ApiSuccessResponse | LoginErrorResponse> => {
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');
  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/logout`, {
    method: 'POST',
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
    .then(async (data) => data)
    .catch(async (error) => loginErrorResponseAdapter(processErrorResponse(await error)));
};
