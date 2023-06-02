import React from 'react'
import { SideBarContextProvider} from '../Context/SideBarContext'
import { TitleContextProvider } from '../Context/TitleContext'
import AppRouter from '../routers/AppRouter'
import {SettingsProvider} from "../Context/SettingsContext";
import {SecurityProvider} from "../Context/SecurityContext";
import {BrowserRouter} from "react-router-dom";

const App = () => {

  return (
      <BrowserRouter>
        <SecurityProvider>
            <SideBarContextProvider>
              <TitleContextProvider>
                  <SettingsProvider>
                    <AppRouter/>
                  </SettingsProvider>
              </TitleContextProvider>
            </SideBarContextProvider>
        </SecurityProvider>
      </BrowserRouter>
    
  )
}

export default App