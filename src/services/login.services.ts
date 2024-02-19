import {
  type FetchWithSessionHandlingType,
  type FetchWithoutAuthorizationRequiredHandlingType
} from '#/hooks/useFetch';
import {
  loginErrorResponseAdapter,
  loginSuccessResponseAdapter,
  logoutSuccessResponseAdapter
} from '#/pages/Login/adapters/LoginAdapter';
import {
  type LoginSuccessResponse,
  type LoginErrorResponse,
  type LogoutSuccessResponse
} from '#/pages/Login/index.types';
// import fetch from 'cross-fetch';

interface LoginCredentials {
  email: string;
  password: string;
  remember_me: boolean;
}

export const logginUser = async (
  credentials: LoginCredentials,
  fetchCallback: FetchWithoutAuthorizationRequiredHandlingType
): Promise<LoginSuccessResponse | LoginErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/login`;
  const response = await fetchCallback(url, 'POST', JSON.stringify(credentials));
  return response.status === 'success'
    ? loginSuccessResponseAdapter(response)
    : loginErrorResponseAdapter(response);
};

// TODO Refactorizar este servicio y sus adapter para su caso de USO
export const refreshUserFromRememberToken = async (
  rememberToken: string | null,
  fetchCallback: FetchWithoutAuthorizationRequiredHandlingType
): Promise<LoginSuccessResponse | LoginErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/remember`;
  const response = await fetchCallback(url, 'POST', JSON.stringify({ remember_me: rememberToken }));
  return response.status === 'success'
    ? loginSuccessResponseAdapter(response)
    : loginErrorResponseAdapter(response);
};

export const loggoutUser = async (
  fetchCallback: FetchWithSessionHandlingType
): Promise<LogoutSuccessResponse | LoginErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/logout`;
  const response = await fetchCallback(url, 'POST');
  return response.status === 'success'
    ? logoutSuccessResponseAdapter(response)
    : loginErrorResponseAdapter(response);
};
