import endPoint from './handlersDependency';
// Mock Data

const success = {
  status: 'success',
  data: {
    bearer_token: 'miToken',
    bearer_expire: '2023-07-04T16:18:05.000Z',
    user: {
      id: '1',
      name: 'userTest',
      email: 'test@mail.com',
      is_verified: true,
      remember_token: null
    }
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

let serviceVerifyEmailResponseSuccess = true;

export const getServiceVerifyEmailResponseSuccess = (): boolean => {
  return serviceVerifyEmailResponseSuccess;
};
export const setServiceVerifyEmailResponseSuccess = (value: boolean): void => {
  serviceVerifyEmailResponseSuccess = value;
};

export const handlersVerifyEmail = [
  endPoint.get(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/email/verify/:id/:hash`,
    async (req, res, ctx) => {
      if (getServiceVerifyEmailResponseSuccess()) {
        return await res(ctx.status(200), ctx.json(success));
      } else {
        return await res(ctx.status(404), ctx.json(error));
      }
    }
  )
];
