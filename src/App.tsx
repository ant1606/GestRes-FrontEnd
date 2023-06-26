import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import AppRouter from '@/routers/AppRouter';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
// import React from 'react';
// import { SideBarContextProvider } from './Context/SideBarContext';
// import { TitleContextProvider } from './Context/TitleContext';
// import AppRouter from './routers/AppRouter';
// import { SettingsProvider } from './Context/SettingsContext';
// import { SecurityProvider } from './Context/SecurityContext';
// import { BrowserRouter } from 'react-router-dom';
// import { UserProvider } from './Context/UserContext';

// const App: React.FC = () => {
//   return (
//     <BrowserRouter>
//       <UserProvider>
//         <SecurityProvider>
//           <SideBarContextProvider>
//             <TitleContextProvider>
//               <SettingsProvider>
//                 <AppRouter />
//               </SettingsProvider>
//             </TitleContextProvider>
//           </SideBarContextProvider>
//         </SecurityProvider>
//       </UserProvider>
//     </BrowserRouter>
//   );
// };

// export default App;
