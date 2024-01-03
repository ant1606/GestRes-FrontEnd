import {
  recourseErrorResponseAdapter,
  recoursesAdapter
} from '#/pages/Private/Dashboard/components/PanelRecourses/adapters/panelRecoursesAdapter';
import {
  type RecourseErrorResponse,
  type RecoursesSuccessResponse
} from '#/pages/Private/Dashboard/components/PanelRecourses/index.type';
import { getBearerToken } from '#/utilities/authenticationManagement';
import { processErrorResponse } from '#/utilities/processAPIResponse.util';

export const getTop5Recourses = async (
  isPorEmpezar: boolean
): Promise<RecoursesSuccessResponse | RecourseErrorResponse> => {
  const bearerToken = getBearerToken();

  return await fetch(
    `${
      import.meta.env.VITE_BACKEND_ENDPOINT
    }/v1/dashboard/getTop5Recourses?porEmpezar=${isPorEmpezar.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${bearerToken}`
      }
    }
  )
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then(async (data) => recoursesAdapter(await data))
    .catch(async (error) => recourseErrorResponseAdapter(processErrorResponse(await error)));
};

export const getAmountByState = async (): Promise<any> => {
  const bearerToken = getBearerToken();

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/dashboard/getAmountByState`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
  })
    .then(async (resp) => {
      if (!resp.ok) return await Promise.reject(resp.json());
      return await resp.json();
    })
    .then(async (data) => data)
    .catch(async (error) => processErrorResponse(await error));
};