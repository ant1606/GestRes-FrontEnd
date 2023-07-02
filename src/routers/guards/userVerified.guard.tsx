import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
interface Props {
  userVerifiedEmail: boolean;
}

const UserVerifiedGuard: React.FC<Props> = ({ userVerifiedEmail }) => {
  return userVerifiedEmail ? <Outlet /> : <Navigate replace to="/notifyVerifyEmail" />;
  // { path: '/', element: userVerifiedEmail ? <Navigate to="/dashboard" replace={true} /> : null },
  // const routes = useRoutes([
  //   {
  //     path: '/dashboard',
  //     element: userVerifiedEmail ? <Navigate to="/notifyVerifyEmail" /> : <>Dashboard</>
  //   },
  //   { path: '*', element: <Navigate to="/notifyVerifyEmail" replace={true} /> }
  // ]);

  // return routes;
};

export default UserVerifiedGuard;
