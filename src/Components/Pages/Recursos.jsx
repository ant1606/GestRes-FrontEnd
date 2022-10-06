import React, { useContext, useEffect } from 'react'
import TitleContext from '../../Context/TitleContext';

const Recursos = () => {

  const {changeTitle} = useContext(TitleContext);
  
  useEffect(()=>{
    changeTitle("Recursos Educativos");
  }, []);

  return (
    <div>Recursos</div>
  )
}

export default Recursos