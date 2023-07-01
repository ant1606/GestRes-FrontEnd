export const resetPassword = async (credentials: Record<string, string>): Promise<any> => {
  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(async (res) => {
      if (!res.ok) return await Promise.reject(res.json());
      return await res.json();
    })
    .then((data) => {
      return data;
    })
    .catch(async (error) => {
      return error;
    });
};
