import Combobox from '#/components/Combobox';
import Field from '#/components/Field';
import perPageItemsValue from '#/config/perPageItemsValue';
import { FaMagnifyingGlass } from 'react-icons/fa6';

import React from 'react';
import { IconContext } from 'react-icons';

interface Props {
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCombo: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  searchValue: string;
  tagPerPage: string | number | readonly string[] | undefined;
}
const FilterView: React.FC<Props> = ({
  handleChangeInput,
  handleChangeCombo,
  searchValue,
  tagPerPage
}) => {
  return (
    <div className="flex mb-4 gap-x-10">
      <div className="flex">
        <IconContext.Provider value={{ size: '1.80em' }}>
          <FaMagnifyingGlass />
        </IconContext.Provider>
        <Field
          type="text"
          label="Buscar Etiqueta"
          name="buscarEtiqueta"
          classBox=""
          handleChange={handleChangeInput}
          value={searchValue}
          errorInput={null}
        />
      </div>
      <Combobox
        label="Registros por Pagina"
        name="perPage"
        options={perPageItemsValue}
        handleChange={handleChangeCombo}
        filter={false}
        classBox="w-32"
        value={tagPerPage}
      />
    </div>
  );
};

export default FilterView;
