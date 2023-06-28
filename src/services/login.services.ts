interface LoginCredentials {
  email: string;
  password: string;
}

export const logginUser = async (credentials: LoginCredentials): Promise<any> => {
  return await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/login`, {
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
      //   // setCookie('bearerToken', data.data.bearer_token, data.data.bearer_expire);
      //   // localStorage.setItem('rememberToken', data.data.user.remember_token);
      //   // localStorage.setItem('user', JSON.stringify(data.data.user));
      //   // setUserIsLogged(data.data.user);
      return data;
    })
    .catch(async (error) => {
      return error;
      // const err = await error;
      // // const processError = err.error.reduce(
      // //   (previous, current) => ({
      // //     ...previous,
      // //     ...Object.entries(current.detail).reduce(
      // //       (acc, [key, value]) => ({
      // //         ...acc,
      // //         [key]: value[0]
      // //       }),
      // //       {}
      // //     )
      // //   }),
      // //   {}
      // // );
      // return err;
      // addNewError(processError);
    });
};
