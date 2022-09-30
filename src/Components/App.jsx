import React from 'react'
import Sidebar from './Organisms/Sidebar'
import Titlebar from './Organisms/Titlebar'

const App = () => {
  return (
    <div className='flex'>

    <Sidebar></Sidebar>

    <div className='flex flex-col w-full'>
      <Titlebar></Titlebar>    
      <div>Contenido</div>
    </div>

    </div>
  )
}

export default App