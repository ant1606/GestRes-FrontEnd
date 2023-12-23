import { useAppSelector } from '#/hooks/redux';
import { useCheckAuthenticationUser } from '#/hooks/useCheckAuthenticationUser';
import { authenticatedUser } from '#/redux/slice/authenticationSlice';
import React, { useCallback, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard: React.FC = () => {
  const { checkedUserLoggin } = useCheckAuthenticationUser();
  const userLoggin = useAppSelector(authenticatedUser);

  const initProccessGuard = useCallback(async () => {
    await checkedUserLoggin();
  }, [checkedUserLoggin]);

  useEffect(() => {
    if (userLoggin.isLogged === false) {
      initProccessGuard();
    }
  }, [initProccessGuard, userLoggin]);

  if (userLoggin.isLoaded) {
    return <p>Cargando...</p>;
  } else {
    if (userLoggin.isLogged === true) {
      return <Outlet />;
    } else {
      return <Navigate replace to="/login" />;
    }
  }

  // if (userLoggin.isLoaded) {
  //   return <p>Cargando...</p>;
  // }

  // return userLoggin.isLogged === true ? <Outlet /> : <Navigate replace to="/login" />;
};

export default AuthGuard;
