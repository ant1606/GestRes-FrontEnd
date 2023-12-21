import endPoint from './handlersDependency';

/**
 * endPoint.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/login`, async (req, res, ctx) => {
    if (getServiceLoginResponseSuccess()) {
      return await res(ctx.status(200), ctx.json(getUser()));
    } else {
      return await res(ctx.status(404), ctx.json(error));
    }
  }),
 

  const getUser = (): Record<string, string | any> => {
    const user = getServiceRememberUserVerified() ? userVerified : userNoVerified;
    user.data.user.remember_token = getserviceLoginUserWithRememberToken() ? 'miRememberToken' : null;
    return user;
  };
*/

const settings = {
  data: [
    { id: '1', key: 'TYPE_LIBRO', type: 'SETTINGS_TYPE', value: 'LIBRO ELECTRONICO', value2: null }
  ]
};
const getSettings = (): Record<string, string | any> => {
  return settings;
};

export const handlersSettings = [
  endPoint.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/settings`, async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json(getSettings()));
  })
];
