import { refreshUserFromRememberToken } from '@/services/login.services.js';
import Cookies from 'js-cookie';

const BEARER_TOKEN = 'bearerToken';
const REMEMBER_ME_TOKEN = 'rememberToken';

export const getRememberToken: string | null = localStorage.getItem(REMEMBER_ME_TOKEN);

export const tokenExpired = (): boolean => {
  const bearer = Cookies.get(BEARER_TOKEN);
  if (
    bearer === null ||
    bearer === 'null' ||
    bearer === '' ||
    bearer === 'undefined' ||
    bearer === undefined
  )
    return true;
  return false;
};

export const rememberTokenExists = (): boolean => {
  const rememberToken = localStorage.getItem(REMEMBER_ME_TOKEN);
  if (
    rememberToken === null ||
    rememberToken === 'null' ||
    rememberToken === '' ||
    rememberToken === 'undefined' ||
    rememberToken === undefined
  ) {
    return false;
  }
  return true;
};

export const savePersistenDataUser = (response: Record<string, string | any>): void => {
  // TODO Formatear la fecha de expiración del bearerToken
  Cookies.set('bearerToken', response.data?.bearerToken, { expires: 1 });
  localStorage.setItem('user', JSON.stringify(response.data?.user));
  if (typeof response.data?.user.rememberToken === 'string')
    localStorage.setItem('rememberToken', response.data?.user.rememberToken);
};

export const deletePersistenDataUser = (): void => {
  // TODO Formatear la fecha de expiración del bearerToken
  Cookies.remove('bearerToken');
  localStorage.clear();
};

export const checkAuthentication = async (): Promise<Record<string, string | any>> => {
  try {
    if (tokenExpired()) {
      if (rememberTokenExists()) {
        const response: ResponseAPI = await refreshUserFromRememberToken(getRememberToken);

        if ('data' in response) {
          savePersistenDataUser(response);
          return response.data?.user;
        } else if ('error' in response) {
          throw new Error('El token no es válido');
        }
      }

      throw new Error('No existen tokens');
    } else {
      const userJson = localStorage.getItem('user') ?? 'null';
      if (userJson === null || userJson === 'null' || userJson === '' || userJson === 'undefined') {
        throw new Error(
          'Los datos del usuario no son válidos, limpiar cache y datos del navegador'
        );
      }

      const userData = JSON.parse(userJson);
      return userData;
    }
  } catch (error) {
    throw new Error('Error en la autenticación');
  }
};
