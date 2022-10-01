import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Sidebar from './Organisms/Sidebar'
import Titlebar from './Organisms/Titlebar'
import Dashboard from './Pages/Dashboard'
import Canales from './Pages/Canales'
import Recursos from './Pages/Recursos'
import Etiquetas from './Pages/Etiquetas'

const App = () => {
  return (
    <div className='flex'>

    <BrowserRouter>
      <Sidebar>
        
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/canales" element={<Canales />}/>
            <Route path="/recursos" element={<Recursos />}/>
            <Route path="/etiquetas" element={<Etiquetas />}/>
          </Routes>
        
      </Sidebar>
    </BrowserRouter>
    </div>
  )
}

export default App