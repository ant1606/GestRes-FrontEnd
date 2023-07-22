import { RecourseErrorResponseAdapter } from './../pages/Private/Recourse/adapters/RecourseAdapter';
import { recoursesAdapter } from '@/pages/Private/Recourse/adapters/RecourseAdapter';
import {
  type RecourseErrorResponse,
  type RecoursesSuccessResponse
} from '@/pages/Private/Recourse/index.types';
import { processErrorResponse } from '@/utilities/processAPIResponse.util';
import Cookies from 'js-cookie';

export const getRecourses = async (
  queryParams: string
): Promise<RecoursesSuccessResponse | RecourseErrorResponse> => {
  // TODO Extraer esta logica de verificacion del bearerToken
  const bearerToken = Cookies.get('bearerToken');
  if (bearerToken === null || bearerToken === undefined)
    throw new Error('Token de autorización inválido');

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/recourses?${queryParams}`, {
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
    .then(async (data) => recoursesAdapter(await data))
    .catch(async (error) => RecourseErrorResponseAdapter(processErrorResponse(await error)));
};
