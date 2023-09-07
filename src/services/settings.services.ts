import { processErrorResponse } from '#/utilities/processAPIResponse.util';
// import Cookies from 'js-cookie';

export const getSettings = async (): Promise<Record<string, string>> => {
  // const bearerToken = Cookies.get('bearerToken');
  // if (bearerToken === null || bearerToken === undefined)
  //   throw new Error('Token de autorización inválido');

  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/settings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  })
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then((data) => data)
    .catch(async (error) => processErrorResponse(await error));
};
