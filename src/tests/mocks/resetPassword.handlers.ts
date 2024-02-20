import endPoint from './handlersDependency';
// Mock Data

const success = {
  status: 'success',
  message: 'Su contraseña fue cambiada con éxito',
  data: []
};
const error = {
  status: 'error',
  code: 404,
  error: {
    message: 'Hubo problemas en la comunicación con el servidor',
    details: []
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
