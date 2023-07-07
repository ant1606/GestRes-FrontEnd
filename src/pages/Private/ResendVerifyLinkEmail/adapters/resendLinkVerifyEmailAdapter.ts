import { type ApiErrorResponse } from '@/models/apiResponse.type';

interface ResendLinkVerifyEmailSuccessResponse {
  data: {
    message: string;
  };
}

interface ResendLinkVerifyEmailErrorResponse {
  error: {
    status: string;
    detail: ApiErrorResponse;
  };
}

export const resendLinkVerifyEmailSuccessResponseAdapter = (
  response: any
): ResendLinkVerifyEmailSuccessResponse => {
  return {
    data: {
      message: response.data.message
    }
  };
};

export const resendLinkVerifyEmailErrorResponseAdapter = (
  error: any
): ResendLinkVerifyEmailErrorResponse => {
  return {
    error: {
      status: error.error.status,
      detail: {
        apiResponse: error.error.detail.api_response ?? null
      }
    }
  };
};
