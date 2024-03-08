import React, { useEffect, useState } from 'react';
import FilterView from './FilterView';
import { useSearchParams } from 'react-router-dom';
import { useWebPage } from '../../context/webPage.context';
import { getWebPages } from '#/services/webPage.services';
import {
  type WebPagePaginatedErrorResponse,
  type WebPagesPaginatedSuccessResponse
} from '../../index.types';
import { useDebounce } from '#/hooks/useDebounce';
import { useFetch } from '#/hooks/useFetch';
import { toastNotifications } from '#/utilities/notificationsSwal';

export const FilterContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchNombre, setSearchNombre] = useState('');
  const [searchTags, setSearchTags] = useState([]);
  const { webPagePerPage, setWebPagePerPage, setWebPages } = useWebPage();

  const { fetchWithSessionHandling } = useFetch();
  const debouncedSearchNombre = useDebounce(searchNombre);

  const execFilter = async (): Promise<void> => {
    try {
      searchParams.delete('searchNombre');
      searchParams.delete('perPage');
      searchParams.delete('searchTags[]');
      searchParams.append('perPage', webPagePerPage);
      searchParams.delete('page');
      searchParams.append('page', '1');
      if (debouncedSearchNombre !== '') searchParams.append('searchNombre', debouncedSearchNombre);
      if (searchTags.length > 0) searchParams.append('searchTags[]', searchTags.toString());

      searchParams.sort();
      setSearchParams(searchParams);
      const response = await getWebPages(searchParams.toString(), fetchWithSessionHandling);

      if (response.status === 'error') {
        const responseError = response as WebPagePaginatedErrorResponse;

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
        const responseSuccess = response as WebPagesPaginatedSuccessResponse;
        setWebPages(responseSuccess);
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    }
  };

  useEffect(() => {
    if (webPagePerPage > 0) execFilter();
  }, [webPagePerPage, debouncedSearchNombre, searchTags]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchNombre(e.target.value);
  };
  const handleChangeSearchTags = (e: any): void => {
    setSearchTags(e.map((obj: any) => obj.value));
  };

  const handleChangeCombo = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setWebPagePerPage(parseInt(e.target.value));
  };

  return (
    <FilterView
      handleChangeCombo={handleChangeCombo}
      handleChangeSearchTags={handleChangeSearchTags}
      handleChangeInput={handleChange}
      searchValue={searchNombre}
      searchTag={searchTags}
      webPagePerPage={webPagePerPage}
    />
  );
};
