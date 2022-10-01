import React, { useContext, useEffect } from 'react'
import TitleContext from '../../Context/TitleContext';

const Dashboard = () => {

  const {title, changeTitle} = useContext(TitleContext);
  useEffect(()=>{
    changeTitle("Dashboard");
  }, []);
  
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard