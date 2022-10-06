import React, { useContext } from 'react'
import TitleContext from '../../Context/TitleContext';

const Titlebar = () => {

  const {title} = useContext(TitleContext);

  return (
    <div className='text-2xl font-semibold h-14 px-6 py-3 shadow-lg'>
      <p>{title}</p>
    </div>
  )
}

export default Titlebar