import React from 'react';

import { Provider } from 'react-redux';
import { store } from '#/redux/store';
import { HashRouter } from 'react-router-dom';
import AppRouter from './routers/AppRouter';

// Se usa HashRouter por el tema de que npm serve no esta amanejando correctamente las rutas con BRowserRoute
const App: React.FC = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </HashRouter>
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
