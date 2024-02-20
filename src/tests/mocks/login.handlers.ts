import endPoint from './handlersDependency';
let serviceRememberResponseSuccess = true;
let serviceRememberUserVerified = true;
let serviceLoginResponseSuccess = true;
let serviceLoginUserWithRememberToken = false;

export const getServiceLoginResponseSuccess = (): boolean => {
  return serviceLoginResponseSuccess;
};
export const getServiceRememberResponseSuccess = (): boolean => {
  return serviceRememberResponseSuccess;
};
export const getServiceRememberUserVerified = (): boolean => {
  return serviceRememberUserVerified;
};
export const getserviceLoginUserWithRememberToken = (): boolean => {
  return serviceLoginUserWithRememberToken;
};

export const setServiceLoginResponseSuccess = (value: boolean): void => {
  serviceLoginResponseSuccess = value;
};
export const setServiceRememberResponseSuccess = (value: boolean): void => {
  serviceRememberResponseSuccess = value;
};
export const setServiceRememberUserVerified = (value: boolean): void => {
  serviceRememberUserVerified = value;
};
export const setserviceLoginUserWithRememberToken = (value: boolean): void => {
  serviceLoginUserWithRememberToken = value;
};

// Mock Data
const userVerified = {
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
const userNoVerified = {
  status: 'success',
  data: {
    bearer_token: 'miToken',
    bearer_expire: '2023-07-04T16:18:05.000Z',
    user: {
      id: '1',
      name: 'userTest',
      email: 'test@mail.com',
      is_verified: false,
      remember_token: null
    }
  }
};
const error = {
  status: 'error',
  code: 404,
  error: {
    message: 'No se encontro el remembertoken',
    details: []
  }
};

const getUser = (): Record<string, string | any> => {
  const user = getServiceRememberUserVerified() ? userVerified : userNoVerified;
  user.data.user.remember_token = getserviceLoginUserWithRememberToken() ? 'miRememberToken' : null;
  return user;
};

export const handlersLogin = [
  endPoint.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/login`, async (req, res, ctx) => {
    if (getServiceLoginResponseSuccess()) {
      return await res(ctx.status(200), ctx.json(getUser()));
    } else {
      return await res(ctx.status(404), ctx.json(error));
    }
  }),
  endPoint.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/remember`, async (req, res, ctx) => {
    if (getServiceRememberResponseSuccess()) {
      return await res(ctx.status(200), ctx.json(getUser()));
    } else {
      return await res(ctx.status(404), ctx.json(error));
    }
  })
];
