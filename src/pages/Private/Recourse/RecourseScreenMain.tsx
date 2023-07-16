import React, { useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TitleContext from '../../../Context/TitleContext.js';
import Button from '../../../Button.js';
import RecourseTable from '../../Organisms/Recourse/RecourseTable.js';
import RecourseFilter from '../../Organisms/Recourse/RecourseFilter.js';
import useRecourse from '../../../Context/RecourseContext.js';
import FooterTable from '../../Organisms/FooterTable.js';
import perPageItemsValue from '../../../helpers/perPageItemsValue.js';
import Loader from '../../Atoms/Loader.js';

const RecourseScreenMain = () => {
  const { changeTitle } = useContext(TitleContext);
  const {
    loadRecourses,
    recourses,
    recourseMeta,
    recoursePerPage,
    setRecoursePerPage,
    recourseIsLoading,
    setIsLoading
  } = useRecourse();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    changeTitle('Recursos Educativos');
    setRecoursePerPage(perPageItemsValue[0].id);
    setIsLoading(false);
    return () => {
      setRecoursePerPage(perPageItemsValue[0].id);
    };
  }, []);

  // TODO Este metodo se repite en cada ScreenMain, ver si puedo acoplarlo en el mismo componenten de FooterTable
  const handlePageChange = (e) => {
    searchParams.delete('page');
    searchParams.append('page', e.selected + 1);
    searchParams.delete('perPage');
    searchParams.append('perPage', recoursePerPage);
    searchParams.sort();
    setSearchParams(searchParams);
    loadRecourses(searchParams.toString());
  };

  return (
    <>
      {/* //TODO Cuando se accede directamente a la ruta colocandola en la url, los assets del sidebar no son cargados, limitar el acceso de las rutas
      solo a las paginas principales
      http://172.24.0.4:5173/recursos/show
      */}
      {recourseIsLoading && <Loader />}

      <Link to="/recursos/new">
        <Button text="Registrar Nuevo" />
      </Link>

      <RecourseFilter />

      {recourses?.length === 0 ? (
        // TODO Crear un componente que indique que no se encontraron resultados
        <p>No se encontraron resultados</p>
      ) : (
        <>
          <RecourseTable />
          {recourseMeta && <FooterTable handlePageChange={handlePageChange} {...recourseMeta} />}
        </>
      )}
    </>
  );
};

export default RecourseScreenMain;
