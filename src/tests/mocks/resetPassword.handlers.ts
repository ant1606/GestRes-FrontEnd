import endPoint from './handlersDependency';
// Mock Data

const success = {
  data: {
    message: 'Se cambio la contraseña'
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

let serviceResetPasswordResponseSuccess = true;

export const getServiceResetPasswordResponseSuccess = (): boolean => {
  return serviceResetPasswordResponseSuccess;
};
export const setServiceResetPasswordResponseSuccess = (value: boolean): void => {
  serviceResetPasswordResponseSuccess = value;
};

export const handlersResetPassword = [
  endPoint.post(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/reset-password`,
    async (req, res, ctx) => {
      if (getServiceResetPasswordResponseSuccess()) {
        return await res(ctx.status(200), ctx.json(success));
      } else {
        return await res(ctx.status(404), ctx.json(error));
      }
    }
  )
];
