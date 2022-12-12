import React, { useContext, useEffect } from 'react'
import {Link, useSearchParams} from 'react-router-dom';
import TitleContext from '../../../Context/TitleContext'
import Button from '../../Atoms/Button';
import RecourseTable from '../../Organisms/Recourse/RecourseTable.jsx';
import RecourseFilter from '../../Organisms/Recourse/RecourseFilter.jsx';
import useRecourse from "../../../Context/RecourseContext.jsx";
import FooterTable from "../../Organisms/FooterTable.jsx";
import perPageItemsValue from "../../../helpers/perPageItemsValue.js";
import Loader from "../../Atoms/Loader.jsx";

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
  const  [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
      setIsLoading(true);
      changeTitle("Recursos Educativos");
      setRecoursePerPage(perPageItemsValue[0].id);
      setIsLoading(false);
      return () => {
          setRecoursePerPage(perPageItemsValue[0].id);
      }
  }, []);

    const handlePageChange = (e) => {
        searchParams.delete('page');
        searchParams.append('page', e.selected + 1);
        searchParams.delete('perPage');
        searchParams.append('perPage', recoursePerPage);
        searchParams.sort()
        setSearchParams(searchParams);
        loadRecourses(searchParams.toString())
    }

  return (
    <>
      {/* //TODO Cuando se accede directamente a la ruta colocandola en la url, los assets del sidebar no son cargados 
      http://172.24.0.4:5173/recursos/show
      */}
      {recourseIsLoading && <Loader/>}

      <Link to="/recursos/new">
        <Button text="Registrar Nuevo" />
      </Link>

      <RecourseFilter />

        {
            recourses?.length===0 ?
                (
                    //TODO Crear un componente que indique que no se encontraron resultados
                    <p>No se encontraron resultados</p>
                )
                :
                (
                    <>
                        <RecourseTable />
                        { recourseMeta &&
                            (
                                <FooterTable
                                    handlePageChange={handlePageChange}
                                    {...recourseMeta}
                                />
                            )
                        }
                    </>
                )
        }


    </>
  )
}

export default RecourseScreenMain