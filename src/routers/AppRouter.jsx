import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SideBar from '../Components/Organisms/Sidebar'
import Dashboard from '../Components/Pages/Dashboard'
import Canales from '../Components/Pages/Canales'
import Recourse from '../Components/Pages/Recourse/Main'
import Etiquetas from '../Components/Pages/Etiquetas/Main'
import RecourseNew from '../Components/Pages/Recourse/New';
import RecourseShow from '../Components/Pages/Recourse/Show';
import Titlebar from '../Components/Organisms/Titlebar'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className='flex'>
        <SideBar/>  
      
        <main className='flex flex-col w-full'>
          <Titlebar />
          <div className='container h-full pt-4 px-6'>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/canales" element={<Canales />}/>
              <Route path="/recursos" element={<Recourse />}/>
              <Route path="/etiquetas" element={<Etiquetas />}/>
              <Route path="/recursos/new" element={<RecourseNew />}/>
              <Route path="/recursos/show" element={<RecourseShow />}/>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default AppRouter