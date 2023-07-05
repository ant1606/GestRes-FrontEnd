import { getCookie } from './manageCookies.js';

const BEARER_TOKEN = 'bearerToken';
const REMEMBER_ME_TOKEN = 'rememberToken';

export const tokenExpired = (): boolean => {
  const bearer = getCookie(BEARER_TOKEN);
  if (bearer === '' || bearer === null) return true;
  return false;
};

export const rememberTokenExists = (): boolean => {
  const rememberToken = localStorage.getItem(REMEMBER_ME_TOKEN);
  // console.log(typeof rememberToken);
  if (
    rememberToken === null ||
    rememberToken === 'null' ||
    rememberToken === '' ||
    rememberToken === 'undefined'
  ) {
    return false;
  }
  return true;
};

export const getRememberToken: string | null = localStorage.getItem(REMEMBER_ME_TOKEN);

// export const checkRememberToken = () => {
//   let success = true;

//   if (
//     localStorage.getItem('rememberToken') === null ||
//     localStorage.getItem('rememberToken') === ''
//   ) {
//     return false;
//   }

//   fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/remember`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       accept: 'application/json'
//     },
//     body: JSON.stringify({
//       remember_me: localStorage.getItem('rememberToken')
//     })
//   })
//     .then(async (res) => {
//       if (!res.ok) return await Promise.reject(res.json());
//       return await res.json();
//     })
//     .then((data) => {
//       success = true;
//       setCookie('bearerToken', data.data.bearer_token, data.data.bearer_expire);
//       localStorage.setItem('rememberToken', data.data.user.remember_token);
//       localStorage.setItem('user', JSON.stringify(data.data.user));
//       setUserIsLogged(data.data.user);
//     })
//     .catch(async (error) => {
//       const err = await error;
//       const processError = err.error.reduce(
//         (previous, currrent) => ({
//           ...previous,
//           [currrent.inputName]: currrent.detail
//         }),
//         {}
//       );
//       addNewError(processError);
//       success = false;
//     });

//   return success;
// };
