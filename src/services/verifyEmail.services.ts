import {
  type FetchWithoutAuthorizationRequiredHandlingType,
  type FetchWithSessionHandlingType
} from '#/hooks/useFetch';
import {
  resendLinkVerifyEmailErrorResponseAdapter,
  resendLinkVerifyEmailSuccessResponseAdapter
} from '#/pages/Private/ResendVerifyLinkEmail/adapters/resendLinkVerifyEmailAdapter';
import {
  type ResendLinkVerifyEmailErrorResponse,
  type ResendLinkVerifyEmailSuccessResponse
} from '#/pages/Private/ResendVerifyLinkEmail/index.types';
import {
  verifyEmailErrorResponseAdapter,
  verifyEmailSuccessResponseAdapter
} from '#/pages/VerifyEmail/adapters/VerifyEmailAdapter';
import {
  type VerifyEmailErrorResponse,
  type VerifyEmailSuccessResponse
} from '#/pages/VerifyEmail/index.types';

export const verifyUserEmail = async (
  id: string,
  hash: string,
  fetchCallback: FetchWithoutAuthorizationRequiredHandlingType
): Promise<VerifyEmailSuccessResponse | VerifyEmailErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/email/verify/${id}/${hash}`;
  const response = await fetchCallback(url, 'GET');
  return response.status === 'success'
    ? verifyEmailSuccessResponseAdapter(response)
    : verifyEmailErrorResponseAdapter(response);
};

export const resendLinkVerifyUserEmail = async (
  id: number,
  fetchCallback: FetchWithSessionHandlingType
): Promise<ResendLinkVerifyEmailSuccessResponse | ResendLinkVerifyEmailErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/email/verification-notification`;
  const response = await fetchCallback(url, 'POST', JSON.stringify({ id }));
  return response.status === 'success'
    ? resendLinkVerifyEmailSuccessResponseAdapter(response)
    : resendLinkVerifyEmailErrorResponseAdapter(response);
};
