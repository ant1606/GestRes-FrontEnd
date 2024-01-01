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
  const [searchTags, setSearchTags] = useState([]);
  const { webPagePerPage, setWebPagePerPage, setWebPages } = useWebPage();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const execFilter = async (): Promise<void> => {
    // try {
    searchParams.delete('searchNombre');
    searchParams.delete('perPage');
    searchParams.delete('searchTags[]');
    searchParams.append('perPage', webPagePerPage);
    searchParams.delete('page');
    searchParams.append('page', '1');
    if (searchNombre !== '') searchParams.append('searchNombre', searchNombre);
    if (searchTags.length > 0) searchParams.append('searchTags[]', searchTags.toString());

    searchParams.sort();
    setSearchParams(searchParams);
    const response = await getWebPages(searchParams.toString());
    setWebPages(response);
  };

  useEffect(() => {
    if (webPagePerPage > 0) execFilter();
  }, [webPagePerPage, searchNombre, searchTags]);

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
