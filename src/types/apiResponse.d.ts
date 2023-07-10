interface ApiErrorResponse {
  apiResponseMessageError: string | null;
}

interface ApiSuccessResponse {
  apiResponseMessageSuccess: string | null;
}

interface ResponseAPI {
  data?: Record<string, any>;
  error?: Record<string, any>;
}
