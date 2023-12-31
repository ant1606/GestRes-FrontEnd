import React, { useEffect, useState } from 'react';
import FilterView from './FilterView';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { deletePersistenDataUser } from '#/utilities/authenticationManagement';
import { useAppDispatch } from '#/hooks/redux';
import { userIsLogout } from '#/redux/slice/authenticationSlice';
import { useWebPage } from '../../context/webPage.context';
import { getWebPages } from '#/services/webPage.services';

export const FilterContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchNombre, setSearchNombre] = useState('');
  const { webPagePerPage, setWebPagePerPage, setWebPages } = useWebPage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const execFilter = async (): Promise<void> => {
    try {
      searchParams.delete('searchNombre');
      searchParams.delete('perPage');
      searchParams.append('perPage', webPagePerPage);
      searchParams.delete('page');
      searchParams.append('page', '1');
      if (searchNombre !== '') searchParams.append('searchNombre', searchNombre);

      searchParams.sort();
      setSearchParams(searchParams);
      const response = await getWebPages(searchParams.toString());
      // console.log(tags);
      //
      if ('data' in response) {
        setWebPages(response);
      } else if ('error' in response) {
        // TODO Ver como encapsular esta lógica en todas las llamadas al endpoint
        // if (response.error.status === '404') {
        //   toastNotifications().notificationError('Ocurrió un error, será redirigido al Login');
        //   deletePersistenDataUser();
        //   dispatch(userIsLogout());
        //   navigate('/login', { replace: true });
        // }

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
    if (webPagePerPage > 0) execFilter();
  }, [webPagePerPage, searchNombre]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchNombre(e.target.value);
  };

  const handleChangeCombo = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setWebPagePerPage(parseInt(e.target.value));
  };

  return (
    <FilterView
      handleChangeCombo={handleChangeCombo}
      handleChangeInput={handleChange}
      searchValue={searchNombre}
      webPagePerPage={webPagePerPage}
    />
  );
};
