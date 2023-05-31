import React from 'react'
import { SideBarContextProvider} from '../Context/SideBarContext'
import { TitleContextProvider } from '../Context/TitleContext'
import AppRouter from '../routers/AppRouter'
import {SettingsProvider} from "../Context/SettingsContext";
import {SecurityProvider} from "../Context/SecurityContext";

const App = () => {

  return (
    <SecurityProvider>
        <SideBarContextProvider>
          <TitleContextProvider>
              <SettingsProvider>
                <AppRouter/>
              </SettingsProvider>
          </TitleContextProvider>
        </SideBarContextProvider>
    </SecurityProvider>
    
  )
}

export default App