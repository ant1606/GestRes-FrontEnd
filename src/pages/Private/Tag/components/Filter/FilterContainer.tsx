import React, { useEffect, useState } from 'react';
import FilterView from './FilterView';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTag } from '../../context/tag.context';
import { getTags } from '#/services/tag.services';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { deletePersistenDataUser } from '#/utilities/authenticationManagement';
import { useAppDispatch } from '#/hooks/redux';
import { userIsLogout } from '#/redux/slice/authenticationSlice';
import {
  type TagPaginatedErrorResponse,
  type TagsPaginatedSuccessResponse
} from '../../index.types';

export const FilterContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchNombre, setSearchNombre] = useState('');
  const { tagPerPage, setTagPerPage, setTags } = useTag();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const execFilter = async (): Promise<void> => {
    try {
      searchParams.delete('searchNombre');
      searchParams.delete('perPage');
      searchParams.append('perPage', tagPerPage);
      searchParams.delete('page');
      searchParams.append('page', '1');
      if (searchNombre !== '') searchParams.append('searchNombre', searchNombre);

      searchParams.sort();
      setSearchParams(searchParams);
      const response = await getTags(searchParams.toString());

      if (response.status === 'error') {
        const responseError = response as TagPaginatedErrorResponse;

        // TODO Ver como encapsular esta lógica de verificación de login en todas las llamadas al endpoint
        if (responseError.code === 404) {
          toastNotifications().notificationError('Ocurrió un error, será redirigido al Login');
          deletePersistenDataUser();
          dispatch(userIsLogout());
          navigate('/login', { replace: true });
        }

        // Mensaje de error general por parte del backend
        if (responseError.message !== '') {
          throw new Error(responseError.message);
        }

        // Para que no interrumpa el UX, seríá mejor validar el campo de search en frontend o agregar un boton de busqueda
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
  }, [tagPerPage, searchNombre]);

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
