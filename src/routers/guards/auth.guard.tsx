import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { authenticatedUser } from '#/redux/slice/authenticationSlice';
import { checkAuthentication } from '#/utilities/authenticationManagement';
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// interface Props {
//   userIsLogged: boolean;
// }

// http://localhost:5173/app/suscription#mi_token=12389asdbkzxc7aske7qwe&expires_in=1345321
// const AuthGuard: React.FC = () => {
//   const userLoggin = useAppSelector(authenticatedUser);
//   // const dispatch = useAppDispatch();

//   // useEffect(() => {
//   //   const verifyAuthentication = async () => {
//   //     // Realiza la verificación de autenticación
//   //     const user = await checkAuthentication();
//   //     // console.log(user, 'Usuari`o de checkAuthentication');
//   //     // console.log(userLoggin, '`userLoggin de slice authenticateUser');
//   //     // Después de la verificación, renderiza AuthGuard solo si el usuario está autenticado
//   //     if (userLoggin.isLogged) {
//   //       console.log('El usuario esta logeado');
//   //       // dispatch(); // Puedes realizar más acciones si es necesario
//   //     }
//   //   };

//   //   verifyAuthentication();
//   // }, [dispatch, userLoggin.isLogged]);

//   // useEffect(() => {
//   //   // Verifica la autenticación solo si la carga ha finalizado
//   //   if (!userLoggin.isLoading) {
//   //     console.log(userLoggin.isLoading, 'Desde usEffect de AuthGuard');
//   //     checkAuthentication(); // Realiza tu lógica de verificación aquí
//   //   }
//   // }, [userLoggin.isLoading]);

//   // // Si la carga aún está en progreso, puedes renderizar un indicador de carga
//   // if (userLoggin.isLoading) {
//   //   return <p>Cargando...</p>; // Puedes usar tu propio componente de indicador de carga
//   // }

//   // Resto de la lógica de AuthGuard
//   return userLoggin.isLogged ? <Outlet /> : <Navigate replace to="/login" />;
// };

const AuthGuard: React.FC = () => {
  console.log('Pasamos por AuthGuard', performance.now());
  const userLoggin = useAppSelector(authenticatedUser);
  console.log('Luego de obtener el userLoggin', performance.now());
  // console.log(userLoggin);
  return userLoggin.isLogged ? <Outlet /> : <Navigate replace to="/login" />;
};

export default AuthGuard;
