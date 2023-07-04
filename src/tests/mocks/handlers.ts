import { rest } from 'msw';

// Mock Data
export const userLoggin = {
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
export const handlers = [
  rest.post('http://localhost/api/v1/remember', async (req, res, ctx) => {
    console.log(req);
    console.log('llamada desde el handler msw');
    return await res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        userLoggin
      })
    );
  })
];
