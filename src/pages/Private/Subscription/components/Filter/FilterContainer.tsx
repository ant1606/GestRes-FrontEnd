import React, { useEffect, useState } from 'react';
import FilterView from './FilterView';
import { useSearchParams } from 'react-router-dom';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { useYoutubeSubscription } from '../../context/subscription.context';
import { getSubscriptions } from '#/services/subscriptions.services';
import { type YoutubeSubscriptionsPaginatedErrorResponse } from '../../index.types';
import { useDebounce } from '#/hooks/useDebounce';
import { useFetch } from '#/hooks/useFetch';

export const FilterContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    youtubeSubscriptionPerPage,
    setYoutubeSubscriptionPerPage,
    setYoutubeSubscriptions,
    setYoutubeSubscriptionSearchLoading
  } = useYoutubeSubscription();
  const [searchTitle, setSearchTitle] = useState('');
  const [searchTags, setSearchTags] = useState([]);

  const { fetchWithSessionHandling } = useFetch();
  const debouncedSearchTitle = useDebounce(searchTitle);

  const handleChangeSearchTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTitle(e.target.value);
  };
  const handleChangeSearchTags = (e: any): void => {
    setSearchTags(e.map((obj: any) => obj.value));
  };
  const handleChangeRecordsPerPage = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setYoutubeSubscriptionPerPage(parseInt(e.target.value));
  };

  const execFilter = async (): Promise<void> => {
    try {
      setYoutubeSubscriptionSearchLoading(true);
      searchParams.delete('searchTitle');
      searchParams.delete('searchTags[]');
      searchParams.delete('perPage');
      searchParams.append('perPage', youtubeSubscriptionPerPage);
      searchParams.delete('page');
      searchParams.append('page', '1');
      if (debouncedSearchTitle !== '') searchParams.append('searchTitle', debouncedSearchTitle);
      if (searchTags.length > 0) searchParams.append('searchTags[]', searchTags.toString());

      searchParams.sort();
      setSearchParams(searchParams);
      const response = await getSubscriptions(searchParams.toString(), fetchWithSessionHandling);
      setYoutubeSubscriptionSearchLoading(false);
      if (response.status === 'error') {
        const responseError = response as YoutubeSubscriptionsPaginatedErrorResponse;

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
        setYoutubeSubscriptions(response);
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    }
  };

  useEffect(() => {
    if (youtubeSubscriptionPerPage > 0) execFilter();
  }, [youtubeSubscriptionPerPage, searchTags, debouncedSearchTitle]);

  return (
    <FilterView
      handleChangeSearchTitle={handleChangeSearchTitle}
      handleChangeSearchTags={handleChangeSearchTags}
      handleChangeRecordsPerPage={handleChangeRecordsPerPage}
      searchTitle={searchTitle}
      searchTag={searchTags}
      youtubeSubscriptionPerPage={youtubeSubscriptionPerPage}
    />
  );
};
