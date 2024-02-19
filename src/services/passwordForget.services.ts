import {
  passwordForgetErrorResponseAdapter,
  passwordForgetSuccessResponseAdapter
} from '#/pages/PasswordForget/adapters/PasswordForgetAdapter';
import {
  type PasswordForgetErrorResponse,
  type PasswordForgetSuccessResponse
} from '#/pages/PasswordForget/index.types';
import { type FetchWithoutAuthorizationRequiredHandlingType } from '#/hooks/useFetch';

export const passwordForget = async (
  email: string,
  fetchCallback: FetchWithoutAuthorizationRequiredHandlingType
): Promise<PasswordForgetSuccessResponse | PasswordForgetErrorResponse> => {
  // TODO Validar los escenarios en donde se obtenga password.throtling, que es cuando ya se ha generado el token y se vuelve a solicitar
  // Y el caso en cuando no se pueda enviar el email por alguna razón
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/forgot-password`;
  const response = await fetchCallback(url, 'POST', JSON.stringify({ email }));
  return response.status === 'success'
    ? passwordForgetSuccessResponseAdapter(response)
    : passwordForgetErrorResponseAdapter(response);
};
