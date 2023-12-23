import { useAppSelector } from '#/hooks/redux';
import { useCheckAuthenticationUser } from '#/hooks/useCheckAuthenticationUser';
import { authenticatedUser } from '#/redux/slice/authenticationSlice';
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicGuard: React.FC = () => {
  const { checkedUserLoggin } = useCheckAuthenticationUser();
  const userLoggin = useAppSelector(authenticatedUser);

  useEffect(() => {
    if (userLoggin.isLogged === false) {
      initProccessGuard();
    }
  }, [userLoggin]);

  const initProccessGuard = async (): Promise<void> => {
    await checkedUserLoggin();
  };

  if (userLoggin.isLogged === true) {
    const lastPath = localStorage.getItem('lastPath') as string;
    if (
      lastPath !== null ||
      lastPath !== 'null' ||
      lastPath !== '' ||
      lastPath !== 'undefined' ||
      lastPath !== undefined
    ) {
      return <Navigate replace to={lastPath} />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Outlet />;
  }
};

export default PublicGuard;
