import Combobox from '#/components/Combobox';
import Field from '#/components/Field';
import perPageItemsValue from '#/config/perPageItemsValue';
import { FaMagnifyingGlass } from 'react-icons/fa6';

import React from 'react';
import { IconContext } from 'react-icons';

interface Props {
  // handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCombo: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  // searchValue: string;
  youtubeSubscriptionPerPage: string | number | readonly string[] | undefined;
}
const FilterView: React.FC<Props> = ({
  // handleChangeInput,
  handleChangeCombo,
  // searchValue,
  youtubeSubscriptionPerPage
}) => {
  return (
    <div className="shadow-2xl px-4 pt-6 pb-4 rounded-xl flex flex-col gap-6 mt-4 mb-10">
      {/* <div className="flex">
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
      </div> */}
      <Combobox
        label="Registros por Pagina"
        name="perPage"
        options={perPageItemsValue}
        handleChange={handleChangeCombo}
        filter={false}
        classBox="w-32"
        value={youtubeSubscriptionPerPage}
      />
    </div>
  );
};

export default FilterView;
