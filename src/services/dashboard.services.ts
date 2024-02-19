import { type FetchWithSessionHandlingType } from '#/hooks/useFetch';
import {
  amountsByStateAdapter,
  amountByStateErrorResponseAdapter
} from '#/pages/Private/Dashboard/components/PanelCountStatus/adapters/panelCountStatusAdapter';
import {
  type AmountByStateErrorResponse,
  type AmountByStateSuccessResponse
} from '#/pages/Private/Dashboard/components/PanelCountStatus/index.type';
import {
  top5RecourseErrorResponseAdapter,
  top5RecoursesAdapter
} from '#/pages/Private/Dashboard/components/PanelRecourses/adapters/panelRecoursesAdapter';
import {
  type Top5RecoursesErrorResponse,
  type Top5RecoursesSuccessResponse
} from '#/pages/Private/Dashboard/components/PanelRecourses/index.type';

export const getTop5Recourses = async (
  isPorEmpezar: boolean,
  fetchCallback: FetchWithSessionHandlingType
): Promise<Top5RecoursesSuccessResponse | Top5RecoursesErrorResponse> => {
  const url = `${
    import.meta.env.VITE_BACKEND_ENDPOINT
  }/v1/dashboard/getTop5Recourses?porEmpezar=${isPorEmpezar.toString()}`;
  const response = await fetchCallback(url, 'GET');
  return response.status === 'success'
    ? top5RecoursesAdapter(response)
    : top5RecourseErrorResponseAdapter(response);
};

export const getAmountsByState = async (
  fetchCallback: FetchWithSessionHandlingType
): Promise<AmountByStateSuccessResponse | AmountByStateErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/dashboard/getAmountByState`;
  const response = await fetchCallback(url, 'GET');
  return response.status === 'success'
    ? amountsByStateAdapter(response)
    : amountByStateErrorResponseAdapter(response);
};
