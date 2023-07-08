import endPoint from './handlersDependency';

// Mock Data
const userVerified = {
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
  error: {
    status: 404,
    detail: {
      api_response: 'No se encontro el remembertoken'
    }
  }
};

let serviceRememberResponseSuccess = true;
let serviceRememberUserVerified = true;
export const getServiceRememberResponseSuccess = (): boolean => {
  return serviceRememberResponseSuccess;
};
export const setServiceRememberResponseSuccess = (value: boolean): void => {
  serviceRememberResponseSuccess = value;
};

export const getServiceRememberUserVerified = (): boolean => {
  return serviceRememberUserVerified;
};
export const setServiceRememberUserVerified = (value: boolean): void => {
  serviceRememberUserVerified = value;
};

const getUser = (): Record<string, string | any> => {
  return getServiceRememberUserVerified() ? userVerified : userNoVerified;
};

export const handlersLogin = [
  endPoint.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/remember`, async (req, res, ctx) => {
    if (getServiceRememberResponseSuccess()) {
      return await res(ctx.status(200), ctx.json(getUser()));
    } else {
      return await res(ctx.status(404), ctx.json(error));
    }
  })
];
