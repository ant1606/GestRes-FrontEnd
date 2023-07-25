import React, { useEffect, useState } from 'react';
import FilterView from './FilterView';
import { useSearchParams } from 'react-router-dom';
import { useRecourse } from '../../context/recourse.context';
import { getRecourses } from '@/services/recourse.services';

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
  const { setRecourses, recoursePerPage, setRecoursePerPage } = useRecourse();

  // TODO Extraer esta logica en el ambito de los settings y valores por defectos cargados en la aplicación
  const getFilterData = async (val: string): Promise<[]> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/settings/${val}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching filter data:', error);
      return [];
    }
  };

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

  const execFilter = async (): Promise<void> => {
    // TODO cambiar el filtro de tipo y estado  para evitar enviar en las queryString el ID de los valores
    searchParams.delete('searchNombre');
    searchParams.delete('searchTipo');
    searchParams.delete('searchEstado');
    searchParams.delete('perPage');
    searchParams.append('perPage', recoursePerPage);
    searchParams.delete('page');
    searchParams.append('page', '1');
    if (searchNombre !== '') searchParams.append('searchNombre', searchNombre);
    if (searchTipo > 0) searchParams.append('searchTipo', searchTipo.toString());
    if (searchEstado > 0) searchParams.append('searchEstado', searchEstado.toString());

    searchParams.sort();
    setSearchParams(searchParams);
    const recourses = await getRecourses(searchParams.toString());
    setRecourses(recourses);
  };

  const initFilters = async (): Promise<void> => {
    const tempTypeDataFilter = await getFilterData(import.meta.env.VITE_SETTINGS_TYPE);
    const tempStatusDataFilter = await getFilterData(import.meta.env.VITE_SETTINGS_STATUS);
    setTypeDataFilter(tempTypeDataFilter);
    setStatusDataFilter(tempStatusDataFilter);
  };

  useEffect(() => {
    initFilters();
  }, []);

  useEffect(() => {
    if (recoursePerPage > 0) execFilter();
  }, [searchNombre, searchTipo, searchEstado, recoursePerPage]);

  return (
    <FilterView
      dataFilterStatus={statusDataFilter}
      dataFilterType={typeDataFilter}
      handleChangeRecordsPerPage={handleChangeRecordsPerPage}
      handleChangeSearchName={handleChangeSearchNombre}
      handleChangeSearchStatus={handleChangeSearchEstado}
      handleChangeSearchType={handleChangeSearchTipo}
      recoursePerPage={recoursePerPage}
      searchName={searchNombre}
      searchStatus={searchEstado}
      searchType={searchTipo}
    />
  );
};
