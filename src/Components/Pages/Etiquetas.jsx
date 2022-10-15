import React, { useContext, useEffect } from 'react'
import TitleContext from '../../Context/TitleContext';

const Etiquetas = () => {
  
  const {changeTitle} = useContext(TitleContext);
  
  useEffect(()=>{
    changeTitle("Etiquetas");
  }, []);

  return (
    <div>Etiquetas</div>
  )
}

export default Etiquetas