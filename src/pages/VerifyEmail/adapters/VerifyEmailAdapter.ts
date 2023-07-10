import { type ApiErrorResponse } from '@/apiResponse';

interface VerifyEmailSuccessResponse {
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

interface VerifyEmailErrorResponse {
  error: {
    status: string;
    detail: ApiErrorResponse;
  };
}

export const verifyEmailSuccessResponseAdapter = (user: any): VerifyEmailSuccessResponse => {
  return {
    data: {
      bearerToken: user.data.bearer_token,
      bearerExpire: user.data.bearer_expire,
      user: {
        id: user.data.user.id,
        name: user.data.user.name,
        email: user.data.user.email,
        isVerified: user.data.user.is_verified,
        rememberToken: user.data.user.remember_token
      }
    }
  };
};

export const verifyEmailErrorResponseAdapter = (error: any): VerifyEmailErrorResponse => {
  return {
    error: {
      status: error.error.status,
      detail: {
        apiResponse: error.error.detail.api_response ?? null
      }
    }
  };
};
