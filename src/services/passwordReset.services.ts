import {
  passwordResetErrorResponseAdapter,
  passwordResetSuccessResponseAdapter
} from './../pages/PasswordReset/adapters/PasswordResetAdapter';
import {
  type PasswordResetErrorResponse,
  type PasswordResetSuccessResponse
} from '#/pages/PasswordReset/index.types';
import { type FetchWithoutAuthorizationRequiredHandlingType } from '#/hooks/useFetch';

interface PasswordResetData {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

export const passwordReset = async (
  data: PasswordResetData,
  fetchCallback: FetchWithoutAuthorizationRequiredHandlingType
): Promise<PasswordResetSuccessResponse | PasswordResetErrorResponse> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/reset-password`;
  const response = await fetchCallback(url, 'POST', JSON.stringify(data));
  return response.status === 'success'
    ? passwordResetSuccessResponseAdapter(response)
    : passwordResetErrorResponseAdapter(response);
};
