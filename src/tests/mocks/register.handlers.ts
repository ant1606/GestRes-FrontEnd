import endPoint from './handlersDependency';
// Mock Data

const success = {
  status: 'success',
  data: {
    message: 'Registro satisfactorio'
  }
};
const error = {
  status: 'error',
  code: 404,
  error: {
    message: 'Hubo problemas en la comunicación con el servidor',
    details: []
  }
};

let serviceRegisterResponseSuccess = true;

export const getServiceRegisterResponseSuccess = (): boolean => {
  return serviceRegisterResponseSuccess;
};
export const setServiceRegisterResponseSuccess = (value: boolean): void => {
  serviceRegisterResponseSuccess = value;
};

export const handlersRegister = [
  endPoint.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/register`, async (req, res, ctx) => {
    if (getServiceRegisterResponseSuccess()) {
      return await res(ctx.status(200), ctx.json(success));
    } else {
      return await res(ctx.status(404), ctx.json(error));
    }
  })
];
