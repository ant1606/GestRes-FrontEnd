import React, { useEffect, useState } from 'react';
import FilterView from './FilterView';
import { useSearchParams } from 'react-router-dom';
import { useTag } from '../../context/tag.context';

export const FilterContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchNombre, setSearchNombre] = useState('');
  const { tagPerPage, setTagPerPage } = useTag();

  useEffect(() => {
    const execFilter = (): void => {
      searchParams.delete('searchNombre');
      searchParams.delete('perPage');
      searchParams.append('perPage', tagPerPage);
      searchParams.delete('page');
      searchParams.append('page', '1');
      if (searchNombre !== '') searchParams.append('searchNombre', searchNombre);

      searchParams.sort();
      setSearchParams(searchParams);
      console.log('Filtrado');
      // TODO Agregar el loadTags al contexto
      // loadTags(searchParams.toString());
    };

    if (tagPerPage > 0) execFilter();
  }, [searchNombre, tagPerPage, searchParams, setSearchParams]);

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
