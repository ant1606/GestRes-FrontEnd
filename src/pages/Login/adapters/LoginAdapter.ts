import { type ApiErrorResponse } from '@/models/apiResponse.type';

interface LoginSuccessResponse {
  data: {
    bearerToken: string;
    bearerExpire: string;
    user: {
      id: string;
      name: string;
      email: string;
      isVerified: boolean;
      rememberToken: string;
    };
  };
}

interface LoginErrorDetailResponse extends ApiErrorResponse {
  email: string | null;
  password: string | null;
}
interface LoginErrorResponse {
  error: {
    status: string;
    detail: LoginErrorDetailResponse;
  };
}

export const loginSuccessResponseAdapter = (user: any): LoginSuccessResponse => {
  return {
    data: {
      bearerToken: user.data.bearer_token,
      bearerExpire: user.data.bearer_expire,
      user: {
        id: user.data.user.email,
        name: user.data.user.email,
        email: user.data.user.email,
        isVerified: user.data.user.is_verified,
        rememberToken: user.data.user.remember_token
      }
    }
  };
};

export const loginErrorResponseAdapter = (error: any): LoginErrorResponse => {
  return {
    error: {
      status: error.error.status,
      detail: {
        apiResponse: error.error.detail.api_response ?? null,
        email: error.error.detail.email ?? null,
        password: error.error.detail.password ?? null
      }
    }
  };
};
