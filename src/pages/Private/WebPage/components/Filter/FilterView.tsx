import Combobox from '#/components/Combobox';
import Field from '#/components/Field';
import SearchTag from '#/components/SelectorTag/SearchTag';
import perPageItemsValue from '#/config/perPageItemsValue';
import React from 'react';

interface Props {
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSearchTags: React.Dispatch<React.SetStateAction<number[]>>;
  handleChangeCombo: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  searchValue: string;
  searchTag: [] | never[];
  webPagePerPage: string | number | readonly string[] | undefined;
}
const FilterView: React.FC<Props> = ({
  handleChangeInput,
  handleChangeSearchTags,
  handleChangeCombo,
  searchValue,
  searchTag,
  webPagePerPage
}) => {
  return (
    <div className="shadow-2xl p-4 rounded-xl flex flex-col gap-6 mb-10">
      <p>Filtros</p>
      <div className="flex justify-between items-center gap-12">
        <div className="basis-1/4 items-end">
          <Field
            type="text"
            label="Nombre"
            name="nombre"
            classBox=""
            handleChange={handleChangeInput}
            value={searchValue}
            errorInput={null}
          />
        </div>
        <div className="basis-3/6 items-end">
          <SearchTag handleChange={handleChangeSearchTags} value={searchTag} />
        </div>
        <div className="basis-1/4 items-end">
          <Combobox
            label="Registros por Pagina"
            name="perPage"
            options={perPageItemsValue}
            handleChange={handleChangeCombo}
            filter={false}
            classBox="w-32"
            value={webPagePerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterView;
