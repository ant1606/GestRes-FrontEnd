import React, { useContext, useEffect } from 'react'
import TitleContext from '../../Context/TitleContext';

const Canales = () => {
  const {title, changeTitle} = useContext(TitleContext);

  useEffect(()=>{
    changeTitle("Canales Youtube");
  }, []);
  return (
    <div>Canales</div>
  )
}

export default Canales