import Combobox from '#/components/Combobox';
import Field from '#/components/Field';
import perPageItemsValue from '#/config/perPageItemsValue';
import { FaMagnifyingGlass } from 'react-icons/fa6';

import React from 'react';
import { IconContext } from 'react-icons';
import SearchTag from '../SelectorTag/SearchTag';

interface Props {
  handleChangeSearchTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSearchTags: React.Dispatch<React.SetStateAction<number[]>>;
  handleChangeRecordsPerPage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  searchTitle: string;
  searchTag: number[] | never[];
  youtubeSubscriptionPerPage: string | number | readonly string[] | undefined;
}
const FilterView: React.FC<Props> = ({
  handleChangeSearchTitle,
  handleChangeSearchTags,
  handleChangeRecordsPerPage,
  searchTitle,
  searchTag,
  youtubeSubscriptionPerPage
}) => {
  return (
    <div className="shadow-2xl px-4 pt-6 pb-4 rounded-xl flex justify-between gap-16 mt-4 mb-10 w-full">
      <div className="flex basis-2/6">
        <IconContext.Provider value={{ size: '1.80em' }}>
          <FaMagnifyingGlass />
        </IconContext.Provider>
        <Field
          type="text"
          label="Buscar Canal"
          name="searchCanal"
          classBox="ml-4"
          handleChange={handleChangeSearchTitle}
          value={searchTitle}
          errorInput={null}
        />
      </div>
      <div className="basis-3/6 items-end">
        <SearchTag handleChange={handleChangeSearchTags} value={searchTag} />
      </div>
      <div className="basis-1/6 items-end">
        <Combobox
          label="Registros por Pagina"
          name="perPage"
          options={perPageItemsValue}
          handleChange={handleChangeRecordsPerPage}
          filter={false}
          classBox=""
          value={youtubeSubscriptionPerPage}
        />
      </div>
    </div>
  );
};

export default FilterView;
