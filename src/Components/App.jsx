import React from 'react'
import { SideBarContextProvider} from '../Context/SideBarContext'
import { TitleContextProvider } from '../Context/TitleContext'
import AppRouter from '../routers/AppRouter'
import {SettingsProvider} from "../Context/SettingsContext";

const App = () => {

  return (
    <SideBarContextProvider>
      <TitleContextProvider>
          <SettingsProvider>
            <AppRouter/>
          </SettingsProvider>
      </TitleContextProvider>
    </SideBarContextProvider>
    
  )
}

export default App