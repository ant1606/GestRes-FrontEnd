import { getCookie } from './manageCookies.js';

const BEARER_TOKEN = 'bearerToken';
export const tokenExpired = () => {
  let bearer = getCookie(BEARER_TOKEN);
  if (bearer === '' || bearer === null) return true;
  return false;
};
