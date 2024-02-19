import { type FetchWithoutAuthorizationRequiredHandlingType } from '#/hooks/useFetch';
import {
  registerErrorResponseAdapter,
  registerSuccessResponseAdapter
} from '#/pages/Register/adapters/RegisterAdapter';
import {
  type RegisterFormData,
  type RegisterErrorResponse,
  type RegisterSuccessResponse
} from '#/pages/Register/index.types';

export const savingUser = async (
  registerUserData: RegisterFormData,
  fetchCallback: FetchWithoutAuthorizationRequiredHandlingType
): Promise<RegisterSuccessResponse | RegisterErrorResponse> => {
  // TODO Validar los escenarios cuando no se pueda enviar el email de verificación por alguna razón
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/register`;
  const body = JSON.stringify({
    ...registerUserData,
    password_confirmation: registerUserData.passwordConfirmation
  });
  const response = await fetchCallback(url, 'POST', body);
  return response.status === 'success'
    ? registerSuccessResponseAdapter(response)
    : registerErrorResponseAdapter(response);
};
