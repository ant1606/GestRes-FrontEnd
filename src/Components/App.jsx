import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Sidebar from './Organisms/Sidebar'
import Dashboard from './Pages/Dashboard'
import Canales from './Pages/Canales'
import Recourse from './Pages/Recourse/Main'
import Etiquetas from './Pages/Etiquetas/Main'
import { SideBarContextProvider} from '../Context/SideBarContext'
import { TitleContextProvider } from '../Context/TitleContext'
import RecourseNew from './Pages/Recourse/New';
import RecourseShow from './Pages/Recourse/Show';
const App = () => {

  return (
    <div className='flex'>

    <BrowserRouter>
      <SideBarContextProvider>
        <TitleContextProvider>
          <Sidebar>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/canales" element={<Canales />}/>
              <Route path="/recursos" element={<Recourse />}/>
              <Route path="/etiquetas" element={<Etiquetas />}/>
              <Route path="/recursos/new" element={<RecourseNew />}/>
              <Route path="/recursos/show" element={<RecourseShow />}/>
            </Routes>
          </Sidebar>
        </TitleContextProvider>
      </SideBarContextProvider>
    </BrowserRouter>
    </div>
  )
}

export default App