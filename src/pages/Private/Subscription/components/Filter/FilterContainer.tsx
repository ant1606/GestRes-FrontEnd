import React, { useEffect } from 'react';
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

  const execFilter = async (): Promise<void> => {
    try {
      console.log('Ejecutando execFilter');
      // searchParams.delete('searchNombre');
      searchParams.delete('perPage');
      searchParams.append('perPage', youtubeSubscriptionPerPage);
      searchParams.delete('page');
      searchParams.append('page', '1');
      // if (searchNombre !== '') searchParams.append('searchNombre', searchNombre);

      searchParams.sort();
      setSearchParams(searchParams);
      const response = await getSubscriptions(searchParams.toString());
      // console.log(tags);
      //
      if ('data' in response) {
        console.log('desde FilterConainer execFilter', youtubeSubscriptionPerPage);
        console.log(response);
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
    console.log('Desde useEffect de FilterContainer ', youtubeSubscriptionPerPage);
    if (youtubeSubscriptionPerPage > 0) execFilter();
  }, [youtubeSubscriptionPerPage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // setSearchNombre(e.target.value);
  };

  const handleChangeCombo = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setYoutubeSubscriptionPerPage(parseInt(e.target.value));
  };

  return (
    <FilterView
      handleChangeCombo={handleChangeCombo}
      // handleChangeInput={handleChange}
      // searchValue={searchNombre}
      youtubeSubscriptionPerPage={youtubeSubscriptionPerPage}
    />
  );
};
