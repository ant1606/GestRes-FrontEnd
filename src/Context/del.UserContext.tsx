import React, { createContext, useContext, useReducer } from 'react';
import types from '../typing/types/types.js';
import userReducer, { initialState } from '../reducers/userReducer.js';
import { setCookie } from '../helpers/manageCookies.js';
import { toastNotifications } from '../helpers/notificationsSwal.js';

const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const addNewError = (error) => {
    dispatch({
      type: types.userAddError,
      payload: error
    });
  };

  const savingUser = async (user) => {
    let success = true;
    await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/register`, {
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
        success = true;
      })
      .catch(async (error) => {
        const err = await error;

        const processError = err.error.reduce(
          (previous, current) => ({
            ...previous,
            ...Object.entries(current.detail).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: value[0]
              }),
              {}
            )
          }),
          []
        );
        addNewError(processError);
        success = false;
      });

    return success;
  };

  const setIsLoading = (isLoad) => {
    dispatch({
      type: types.userIsLoading,
      payload: isLoad
    });
  };

  const forgetPassword = async (email) => {
    let success = true;
    await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(async (res) => {
        if (!res.ok) return await Promise.reject(res.json());
        return await res.json();
      })
      .then((data) => {
        success = true;
      })
      .catch(async (error) => {
        const err = await error;

        const processError = err.error.reduce(
          (previous, current) => ({
            ...previous,
            ...Object.entries(current.detail).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: value[0]
              }),
              {}
            )
          }),
          []
        );
        addNewError(processError);
        success = false;
      });

    return success;
  };

  const resetPassword = async (credentials) => {
    let success = true;
    await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/reset-password`, {
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
        success = true;
        toastNotifications().toastSuccesCustomize('Se actualizo su contraseña satisfactoriamente.');
      })
      .catch(async (error) => {
        const err = await error;

        const processError = err.error.reduce(
          (previous, current) => ({
            ...previous,
            ...Object.entries(current.detail).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: value[0]
              }),
              {}
            )
          }),
          []
        );
        addNewError(processError);
        success = false;
      });

    return success;
  };

  const userActions = {
    userError: state.error,
    userIsLoading: state.isLoading,
    addNewError,
    savingUser,
    setIsLoading,
    forgetPassword,
    resetPassword
  };

  return <UserContext.Provider value={userActions}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe usase junto a UserContext');
  }
  return context;
};

export default useUser;
