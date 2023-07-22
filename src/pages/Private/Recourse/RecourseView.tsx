import Button from '@/components/Button';
import Loader from '@/components/Loader';
import { useAppSelector } from '@/hooks/redux';
import { type RootState } from '@/redux/store';
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Table from './components/Table';
import { getRecourses } from '@/services/recourse.services';
import { useRecourse } from './context/recourse.context';
import perPageItemsValue from '@/config/perPageItemsValue';
import FooterTable from '@/components/FooterTable';
import Filter from './components/Filter';

interface ReactPaginaOnPageChangeArgument {
  selected: number;
}

const RecourseView: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.loadingState);
  const { recourses, setRecourses, setRecoursePerPage, recourseMeta, recoursePerPage } =
    useRecourse();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setRecoursePerPage(perPageItemsValue[0].id);
  }, []);

  const handlePageChange = async (e: ReactPaginaOnPageChangeArgument): Promise<void> => {
    searchParams.delete('page');
    searchParams.append('page', (e.selected + 1).toString());
    searchParams.delete('perPage');
    searchParams.append('perPage', recoursePerPage);
    searchParams.sort();
    setSearchParams(searchParams);
    const recourses = await getRecourses(searchParams.toString());
    setRecourses(recourses);
  };

  const handlePageChangeWrapper = (e: ReactPaginaOnPageChangeArgument): void => {
    handlePageChange(e);
  };

  return (
    <>
      {/* //TODO Cuando se accede directamente a la ruta colocandola en la url, los assets del sidebar no son cargados, limitar el acceso de las rutas
    solo a las paginas principales
    http://172.24.0.4:5173/recursos/show
    */}
      {uiLoading && <Loader />}

      <Link to="/recursos/new">
        <Button text="Registrar Nuevo" btnType="main" type="button" />
      </Link>

      <Filter />

      {recourses?.length === 0 ? (
        // TODO Crear un componente que indique que no se encontraron resultados
        <p>No se encontraron resultados</p>
      ) : (
        <>
          <Table />
          {recourseMeta !== null && (
            <FooterTable handlePageChange={handlePageChangeWrapper} {...recourseMeta} />
          )}
        </>
      )}
    </>
  );
};

export default RecourseView;
