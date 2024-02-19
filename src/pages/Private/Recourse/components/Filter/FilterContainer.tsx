import React, { useEffect, useState } from 'react';
import FilterView from './FilterView';
import { useSearchParams } from 'react-router-dom';
import { useRecourse } from '../../context/recourse.context';
import { getRecourses } from '#/services/recourse.services';
import { type RecoursePaginatedErrorResponse } from '../../index.types';
import { useDebounce } from '#/hooks/useDebounce';
import { useFetch } from '#/hooks/useFetch';
import { useAppSelector } from '#/hooks/redux';
import { type RootState } from '#/redux/store';

export interface FilterData {
  id: number;
  value: string;
}

export const FilterContainer: React.FC = () => {
  const [typeDataFilter, setTypeDataFilter] = useState<FilterData[]>([]);
  const [statusDataFilter, setStatusDataFilter] = useState<FilterData[]>([]);
  const [searchNombre, setSearchNombre] = useState('');
  const [searchTipo, setSearchTipo] = useState(0);
  const [searchEstado, setSearchEstado] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTags, setSearchTags] = useState<number[]>([]);
  const { setRecourses, recoursePerPage, setRecoursePerPage } = useRecourse();

  const debouncedSearchNombre = useDebounce(searchNombre);
  const debouncedSearchTags = useDebounce(searchTags);
  const { fetchWithSessionHandling } = useFetch();
  const { settingsType, settingsStatus } = useAppSelector((state: RootState) => state.settings);

  const handleChangeSearchNombre = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchNombre(e.target.value);
  };
  const handleChangeSearchTipo = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSearchTipo(parseInt(e.target.value));
  };
  const handleChangeSearchEstado = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSearchEstado(parseInt(e.target.value));
  };
  const handleChangeRecordsPerPage = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setRecoursePerPage(parseInt(e.target.value));
  };
  // TODO Corregir tipado de interfaz del objeto e, procediente del componente searchTags
  const handleChangeSearchTags = (e): void => {
    setSearchTags(e.map((obj) => obj.value));
  };

  const execFilter = async (): Promise<void> => {
    // TODO cambiar el filtro de tipo y estado  para evitar enviar en las queryString el ID de los valores
    searchParams.delete('searchNombre');
    searchParams.delete('searchTipo');
    searchParams.delete('searchEstado');
    searchParams.delete('searchTags[]');
    searchParams.delete('perPage');
    searchParams.append('perPage', recoursePerPage);
    searchParams.delete('page');
    searchParams.append('page', '1');
    if (debouncedSearchNombre !== '') searchParams.append('searchNombre', debouncedSearchNombre);
    if (searchTipo > 0) searchParams.append('searchTipo', searchTipo.toString());
    if (searchEstado > 0) searchParams.append('searchEstado', searchEstado.toString());
    if (debouncedSearchTags.length > 0)
      searchParams.append('searchTags[]', debouncedSearchTags.toString());

    searchParams.sort();
    setSearchParams(searchParams);
    const response = await getRecourses(searchParams.toString(), fetchWithSessionHandling);

    if (response.status === 'error') {
      const responseError = response as RecoursePaginatedErrorResponse;
      // Mensaje de error general por parte del backend
      if (responseError.message !== '') {
        throw new Error(responseError.message);
      }

      // Para que no interrumpa el UX, seríá mejor validar el campo de search en frontend o agregar un boton de busqueda
      // TODO Son errores de validación de campos, ver si se maneja el filtrado como un formulario para mostrar los errores
      // en los inputs
      if (!Object.values(responseError.details).every((value) => value === null)) {
        const message = Object.values(responseError.details).reduce((acc, val) => {
          if (val !== null) {
            acc += val + ' ';
          }
          return acc;
        }, '');

        throw new Error(message);
      }
    } else {
      // const responseSuccess = response as TagsPaginatedSuccessResponse;
      setRecourses(response);
    }
  };

  useEffect(() => {
    setTypeDataFilter(settingsType);
    setStatusDataFilter(settingsStatus);
  }, [settingsType, settingsStatus]);

  useEffect(() => {
    if (recoursePerPage > 0) execFilter();
  }, [debouncedSearchNombre, searchTipo, searchEstado, recoursePerPage, debouncedSearchTags]);

  return (
    <FilterView
      dataFilterStatus={statusDataFilter}
      dataFilterType={typeDataFilter}
      handleChangeRecordsPerPage={handleChangeRecordsPerPage}
      handleChangeSearchName={handleChangeSearchNombre}
      handleChangeSearchStatus={handleChangeSearchEstado}
      handleChangeSearchType={handleChangeSearchTipo}
      handleChangeSearchTags={handleChangeSearchTags}
      recoursePerPage={recoursePerPage}
      searchName={searchNombre}
      searchStatus={searchEstado}
      searchType={searchTipo}
      searchTag={searchTags}
    />
  );
};
