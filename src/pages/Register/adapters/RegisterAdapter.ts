import { type ApiErrorResponse } from '@/apiResponse';

interface RegisterSuccessResponse {
  data: {
    message: string;
  };
}

interface RegisterErrorDetailResponse extends ApiErrorResponse {
  name: string | null;
  email: string | null;
  password: string | null;
  passwordConfirmation: string | null;
}
interface RegisterErrorResponse {
  error: {
    status: string;
    detail: RegisterErrorDetailResponse;
  };
}

export const registerSuccessResponseAdapter = (response: any): RegisterSuccessResponse => {
  return {
    data: {
      message: response.data.message
    }
  };
};

export const registerErrorResponseAdapter = (error: any): RegisterErrorResponse => {
  return {
    error: {
      status: error.error.status,
      detail: {
        apiResponse: error.error.detail.api_response ?? null,
        name: error.error.detail.name ?? null,
        email: error.error.detail.email ?? null,
        password: error.error.detail.password ?? null,
        passwordConfirmation: error.error.detail.password_confirmation ?? null
      }
    }
  };
};
