import endPoint from './handlersDependency';
// Mock Data

const success = {
  data: {
    message: 'Se genero link de reset password'
  }
};
const error = {
  error: {
    status: 404,
    detail: {
      api_response: 'Hubo problemas en la comunicación con el servidor'
    }
  }
};

let serviceForgetPasswordResponseSuccess = true;

export const getServiceForgetPasswordResponseSuccess = (): boolean => {
  return serviceForgetPasswordResponseSuccess;
};
export const setServiceForgetPasswordResponseSuccess = (value: boolean): void => {
  serviceForgetPasswordResponseSuccess = value;
};

export const handlersForgetPassword = [
  endPoint.post(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/forgot-password`,
    async (req, res, ctx) => {
      if (getServiceForgetPasswordResponseSuccess()) {
        return await res(ctx.status(200), ctx.json(success));
      } else {
        return await res(ctx.status(404), ctx.json(error));
      }
    }
  )
];
