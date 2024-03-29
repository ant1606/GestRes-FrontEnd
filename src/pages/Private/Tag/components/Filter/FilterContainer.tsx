import React, { useEffect, useState } from 'react';
import FilterView from './FilterView';
import { useSearchParams } from 'react-router-dom';
import { useTag } from '../../context/tag.context';
import { getTags } from '#/services/tag.services';
import { toastNotifications } from '#/utilities/notificationsSwal';

import {
  type TagPaginatedErrorResponse,
  type TagsPaginatedSuccessResponse
} from '../../index.types';
import { useDebounce } from '#/hooks/useDebounce';
import { useFetch } from '#/hooks/useFetch';

export const FilterContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchNombre, setSearchNombre] = useState('');
  const { tagPerPage, setTagPerPage, setTags, setTagSearchLoading } = useTag();
  const { fetchWithSessionHandling } = useFetch();
  const debouncedSearchNombre = useDebounce(searchNombre);

  const execFilter = async (): Promise<void> => {
    try {
      setTagSearchLoading(true);
      searchParams.delete('searchNombre');
      searchParams.delete('perPage');
      searchParams.append('perPage', tagPerPage);
      searchParams.delete('page');
      searchParams.append('page', '1');
      if (debouncedSearchNombre !== '') searchParams.append('searchNombre', debouncedSearchNombre);

      searchParams.sort();
      setSearchParams(searchParams);
      const response = await getTags(searchParams.toString(), fetchWithSessionHandling);
      setTagSearchLoading(false);
      if (response.status === 'error') {
        const responseError = response as TagPaginatedErrorResponse;

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
        const responseSuccess = response as TagsPaginatedSuccessResponse;
        setTags(responseSuccess);
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    }
  };

  useEffect(() => {
    if (tagPerPage > 0) execFilter();
  }, [tagPerPage, debouncedSearchNombre]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchNombre(e.target.value);
  };

  const handleChangeCombo = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTagPerPage(parseInt(e.target.value));
  };

  return (
    <FilterView
      handleChangeCombo={handleChangeCombo}
      handleChangeInput={handleChange}
      searchValue={searchNombre}
      tagPerPage={tagPerPage}
    />
  );
};
