import { processErrorResponse } from '#/utilities/processAPIResponse.util';

export const getSettings = async (): Promise<Record<string, string>> => {
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
