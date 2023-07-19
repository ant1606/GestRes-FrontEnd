import React, { useEffect, useState } from 'react';
import FilterView from './FilterView';
import { useSearchParams } from 'react-router-dom';
import { useTag } from '../../context/tag.context';
import { getTags } from '@/services/tag.services';

export const FilterContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchNombre, setSearchNombre] = useState('');
  const { tagPerPage, setTagPerPage, setTags } = useTag();

  const execFilter = async (): Promise<void> => {
    searchParams.delete('searchNombre');
    searchParams.delete('perPage');
    searchParams.append('perPage', tagPerPage);
    searchParams.delete('page');
    searchParams.append('page', '1');
    if (searchNombre !== '') searchParams.append('searchNombre', searchNombre);

    searchParams.sort();
    setSearchParams(searchParams);
    // TODO Agregar el loadTags al contexto
    const tags = await getTags(searchParams.toString());
    console.log(tags, 'desde execFilter');
    setTags(tags);
    // loadTags(searchParams.toString());
  };

  useEffect(() => {
    console.log({ tagPerPage }, 'desde filtercontainer');
    if (tagPerPage > 0) execFilter();
  }, [tagPerPage]);

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
