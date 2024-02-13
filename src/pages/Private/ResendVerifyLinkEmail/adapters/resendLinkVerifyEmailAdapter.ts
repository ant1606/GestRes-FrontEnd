import {
  type ResendLinkVerifyEmailErrorResponse,
  type ResendLinkVerifyEmailSuccessResponse
} from '../index.types';

export const resendLinkVerifyEmailSuccessResponseAdapter = (
  response: any
): ResendLinkVerifyEmailSuccessResponse => {
  return {
    status: response.status,
    code: response.code,
    message: response.message
  };
};

export const resendLinkVerifyEmailErrorResponseAdapter = (
  error: any
): ResendLinkVerifyEmailErrorResponse => {
  return {
    status: error.status,
    code: error.code,
    message: error.message
  };
};
