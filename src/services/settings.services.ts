// import { getBearerToken } from '#/utilities/authenticationManagement';
import { type FetchWithoutAuthorizationRequiredHandlingType } from '#/hooks/useFetch';

export const getSettings = async (
  fetchCallback: FetchWithoutAuthorizationRequiredHandlingType
): Promise<Record<string, string>> => {
  const url = `${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/settings`;
  return await fetchCallback(url, 'GET');
};
