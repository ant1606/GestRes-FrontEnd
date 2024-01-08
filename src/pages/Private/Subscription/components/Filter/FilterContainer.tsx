import React, { useEffect, useState } from 'react';
import FilterView from './FilterView';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { deletePersistenDataUser } from '#/utilities/authenticationManagement';
import { useAppDispatch } from '#/hooks/redux';
import { userIsLogout } from '#/redux/slice/authenticationSlice';
import { useYoutubeSubscription } from '../../context/subscription.context';
import { getSubscriptions } from '#/services/subscriptions.services';

export const FilterContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { youtubeSubscriptionPerPage, setYoutubeSubscriptionPerPage, setYoutubeSubscriptions } =
    useYoutubeSubscription();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState('');
  const [searchTags, setSearchTags] = useState([]);

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
      searchParams.delete('searchTitle');
      searchParams.delete('searchTags[]');
      searchParams.delete('perPage');
      searchParams.append('perPage', youtubeSubscriptionPerPage);
      searchParams.delete('page');
      searchParams.append('page', '1');
      if (searchTitle !== '') searchParams.append('searchTitle', searchTitle);
      if (searchTags.length > 0) searchParams.append('searchTags[]', searchTags.toString());

      searchParams.sort();
      setSearchParams(searchParams);
      const response = await getSubscriptions(searchParams.toString());
      if ('data' in response) {
        setYoutubeSubscriptions(response);
      } else if ('error' in response) {
        // TODO Ver como encapsular esta lógica en todas las llamadas al endpoint
        if (response.error.status === '404') {
          toastNotifications().notificationError('Ocurrió un error, será redirigido al Login');
          deletePersistenDataUser();
          dispatch(userIsLogout());
          navigate('/login', { replace: true });
        }

        const errorsDetail = response.error.detail;

        if ('apiResponseMessageError' in errorsDetail) {
          if (errorsDetail.apiResponseMessageError !== null)
            throw new Error(errorsDetail.apiResponseMessageError);
        }
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    }
  };

  useEffect(() => {
    if (youtubeSubscriptionPerPage > 0) execFilter();
  }, [youtubeSubscriptionPerPage, searchTags, searchTitle]);

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
