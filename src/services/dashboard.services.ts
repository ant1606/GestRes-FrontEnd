import {
  amountsByStateAdapter,
  amountByStateErrorResponseAdapter
} from '#/pages/Private/Dashboard/components/PanelCountStatus/adapters/panelCountStatusAdapter';
import {
  top5RecourseErrorResponseAdapter,
  top5RecoursesAdapter
} from '#/pages/Private/Dashboard/components/PanelRecourses/adapters/panelRecoursesAdapter';
import {
  type Top5RecoursesErrorResponse,
  type Top5RecoursesSuccessResponse
} from '#/pages/Private/Dashboard/components/PanelRecourses/index.type';
import { getBearerToken } from '#/utilities/authenticationManagement';
import { processErrorResponse } from '#/utilities/processAPIResponse.util';

export const getTop5Recourses = async (
  isPorEmpezar: boolean
): Promise<Top5RecoursesSuccessResponse | Top5RecoursesErrorResponse> => {
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
    .then(async (data) => top5RecoursesAdapter(await data))
    .catch(async (error) => top5RecourseErrorResponseAdapter(processErrorResponse(await error)));
};

export const getAmountsByState = async (): Promise<any> => {
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
    .then(async (data) => amountsByStateAdapter(await data))
    .catch(async (error) => amountByStateErrorResponseAdapter(processErrorResponse(await error)));
};
