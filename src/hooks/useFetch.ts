import { useAppDispatch } from '#/hooks/redux';
import { userIsLogout } from '#/redux/slice/authenticationSlice';

import { deletePersistenDataUser, getBearerToken } from '#/utilities/authenticationManagement';
import { processErrorResponse } from '#/utilities/processAPIResponse.util';
import { useNavigate } from 'react-router-dom';

export type methodType = 'GET' | 'PUT' | 'POST' | 'DELETE';
export type FetchWithSessionHandlingType = (
  url: string,
  method: methodType,
  body?: string
) => Promise<any>;
export type fetchWithoutReturnHandlingType = (
  url: string,
  method: methodType,
  body?: string
) => Promise<void>;

export type FetchWithoutAuthorizationRequiredHandlingType = (
  url: string,
  method: methodType,
  body?: string
) => Promise<any>;
interface optionsFetch {
  method: methodType;
  body?: string | null;
  headers: {
    'Content-Type': string;
    accept: string;
    Authorization?: string;
  };
  signal?: AbortSignal;
}

interface useFetchOutput {
  fetchWithSessionHandling: FetchWithSessionHandlingType;
  fetchWithoutReturnHandling: fetchWithoutReturnHandlingType;
  fetchWithoutAuthorizationRequiredHandling: FetchWithoutAuthorizationRequiredHandlingType;
  controller: AbortController;
}

export const useFetch = (): useFetchOutput => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Usando AbortController para abortar las peticiones al endpoint
  const controller = new AbortController();

  const fetchWithSessionHandling = async (
    url: string,
    method: methodType,
    body?: string | null
  ): Promise<any> => {
    const bearerToken = getBearerToken();
    const requestOptions: optionsFetch = {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${bearerToken}`
      },
      signal: controller.signal
    };

    const response = await fetch(url, requestOptions)
      .then(async (res) => {
        if (!res.ok) return await Promise.reject(res.json());
        return await res.json();
      })
      .then(async (data) => data)
      .catch(async (error) => {
        if (error.name === 'AbortError') throw error;
        return processErrorResponse(await error);
      });

    // Verificando errores de autorización
    if (response.code === 401) {
      deletePersistenDataUser();
      dispatch(userIsLogout());
      navigate('/login', { replace: true });
      throw new Error('Su sesión ha expirado');
    }

    return response;
  };

  const fetchWithoutReturnHandling = async (
    url: string,
    method: methodType,
    body?: string | null
  ): Promise<void> => {
    const bearerToken = getBearerToken();
    const requestOptions: optionsFetch = {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${bearerToken}`
      }
    };

    fetch(url, requestOptions);
  };

  const fetchWithoutAuthorizationRequiredHandling = async (
    url: string,
    method: methodType,
    body?: string | null
  ): Promise<any> => {
    const requestOptions: optionsFetch = {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      }
    };

    return await fetch(url, requestOptions)
      .then(async (res) => {
        if (!res.ok) return await Promise.reject(res.json());
        return await res.json();
      })
      .then(async (data) => data)
      .catch(async (error) => processErrorResponse(await error));
  };

  return {
    fetchWithSessionHandling,
    fetchWithoutReturnHandling,
    fetchWithoutAuthorizationRequiredHandling,
    controller
  };
};
