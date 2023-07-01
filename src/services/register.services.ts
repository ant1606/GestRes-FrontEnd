interface UserData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const savingUser = async (user: UserData): Promise<any> => {
  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify(user)
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
