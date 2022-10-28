import React from 'react'
import { SideBarContextProvider} from '../Context/SideBarContext'
import { TitleContextProvider } from '../Context/TitleContext'
import AppRouter from '../routers/AppRouter'

const App = () => {

  return (
    <SideBarContextProvider>
      <TitleContextProvider>
        <AppRouter/>
      </TitleContextProvider>
    </SideBarContextProvider>
    
  )
}

export default App