import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from './guards/auth.guard';

interface Props {
  children: JSX.Element[] | JSX.Element;
  userVerifiedEmail: boolean;
  userIsLogged: boolean;
}
const RoutesWithVerificationEmail: React.FC<Props> = ({
  children,
  userVerifiedEmail,
  userIsLogged
}) => {
  console.log({ userIsLogged, userVerifiedEmail });
  console.log(userIsLogged && !userVerifiedEmail);
  return (
    <Routes>
      {children}

      {userIsLogged && !userVerifiedEmail ? (
        <Route element={<Navigate replace to="/notifyVerifyEmail" />}></Route>
      ) : (
          
        )}
    </Route>

      
    </Routes >
  );
};
export default RoutesWithVerificationEmail;
