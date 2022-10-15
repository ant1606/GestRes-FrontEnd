import { useContext, useEffect  } from 'react'
import { Link } from 'react-router-dom';
import TitleContext from '../../../Context/TitleContext'
import Button from '../../Atoms/Button';
import RecourseTable from '../../Organisms/Recourse/Table';
import Filter from '../../Organisms/Recourse/Filter';

const Recursos = () => {

  const {changeTitle} = useContext(TitleContext);

  useEffect(()=>{
    changeTitle("Recursos Educativos");
  }, []);

  return (
    <>
      {/* //TODO Cuando se accede directamente a la ruta colocandola en la url, los assets del sidebar no son cargados */}
      <Link to="/recursos/new">
        <Button text="Registrar Nuevo"/>
      </Link>
      
      <Filter />

      <RecourseTable />
    </>
  )
}

export default Recursos