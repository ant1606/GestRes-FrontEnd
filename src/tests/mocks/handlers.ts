import { rest } from 'msw';

// Mock Data
export const user = {
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
export const error = {
  error: {
    status: 404,
    detail: {
      api_response: 'No se encontro el remembertoken'
    }
  }
};
// rest.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/login`, (req, res, ctx) => {
//   // Persist user's authentication in the session
//   // sessionStorage.setItem('is-authenticated', 'true');

//   return res(
//     // Respond with a 200 status code
//     ctx.status(200),
//     ctx.json({
//       userLoggin
//     })
//   );
// }),
let serviceRememberResponseSuccess = true;
export const getServiceRememberResponseSuccess = (): boolean => {
  return serviceRememberResponseSuccess;
};
export const setServiceRememberResponseSuccess = (value: boolean): void => {
  serviceRememberResponseSuccess = value;
};

export const handlers = [
  rest.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/remember`, async (req, res, ctx) => {
    // console.log(params);
    if (getServiceRememberResponseSuccess()) {
      return await res(ctx.status(200), ctx.json(user));
    } else {
      return await res(ctx.status(404), ctx.json(error));
    }
  })
];
