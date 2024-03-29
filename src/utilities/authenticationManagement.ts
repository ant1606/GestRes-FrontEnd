import { refreshUserFromRememberToken } from '#/services/login.services.js';
import { AES, enc } from 'crypto-js';

const BEARER_TOKEN = 'bearerToken';
const REMEMBER_ME_TOKEN = 'rememberToken';
const MY_SECRET_KEY = 'avc1xz3se1s2czx448we3a8xc00231';

export const getRememberToken: string | null = localStorage.getItem(REMEMBER_ME_TOKEN);

export const tokenExpired = (): boolean => {
  // const bearer = Cookies.get(BEARER_TOKEN);
  const bearer = sessionStorage.getItem(BEARER_TOKEN);
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

export const getBearerToken = (): string => {
  const bearerToken = sessionStorage.getItem(BEARER_TOKEN);
  if (
    bearerToken === null ||
    bearerToken === 'null' ||
    bearerToken === '' ||
    bearerToken === 'undefined' ||
    bearerToken === undefined
  )
    throw new Error('Token de autorización inválido');
  return bearerToken;
};

export const savePersistenDataUser = (response: Record<string, string | any>): void => {
  // const date = new Date(response.data?.bearerExpire);
  // const dateFixedTime = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  // Cookies.set('bearerToken', response.data?.bearerToken, {
  //   expires: dateFixedTime
  // });
  // Cookies.set('bearerToken', response.data?.bearerToken);
  sessionStorage.setItem(BEARER_TOKEN, response?.bearerToken);
  localStorage.setItem('user', encryptUserData(JSON.stringify(response?.user)));
  if (typeof response?.user.rememberToken === 'string')
    localStorage.setItem(REMEMBER_ME_TOKEN, response?.user.rememberToken);
};

export const encryptUserData = (userData: string): string => {
  return AES.encrypt(userData, MY_SECRET_KEY).toString();
};
const decryptUserData = (userDataEncrypt: string): string => {
  const bytes = AES.decrypt(userDataEncrypt, MY_SECRET_KEY);
  return bytes.toString(enc.Utf8);
};

export const deletePersistenDataUser = (): void => {
  // Cookies.remove('bearerToken');
  sessionStorage.clear();
  localStorage.clear();
};

export const checkAuthentication = async (): Promise<Record<string, string | any>> => {
  return await new Promise((resolve, reject) => {
    try {
      if (tokenExpired()) {
        if (rememberTokenExists()) {
          refreshUserFromRememberToken(getRememberToken)
            .then((response: ResponseAPI) => {
              if ('data' in response) {
                savePersistenDataUser(response);
                resolve(response.data?.user);
              } else if ('error' in response) {
                reject(new Error('El token no es válido'));
              }
            })
            .catch((error) => {
              reject(new Error('Error en la autenticación'));
            });
        } else {
          reject(new Error('No existen tokens'));
        }
      } else {
        const userJson = localStorage.getItem('user') ?? 'null';
        if (
          userJson === null ||
          userJson === 'null' ||
          userJson === '' ||
          userJson === 'undefined'
        ) {
          reject(
            new Error('Los datos del usuario no son válidos, limpiar caché y datos del navegador')
          );
        }

        // TODO Verificar la encriptación en este punto
        const userData = JSON.parse(decryptUserData(userJson));
        resolve(userData);
      }
    } catch (error) {
      reject(new Error('Error en la autenticación'));
    }
  });
};
