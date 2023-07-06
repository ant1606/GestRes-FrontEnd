import endPoint from './handlersDependency';
// Mock Data

const success = {
  data: {
    message: 'Registro satisfactorio'
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
