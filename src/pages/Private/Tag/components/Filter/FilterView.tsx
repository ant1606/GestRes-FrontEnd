import Combobox from '#/components/Combobox';
import Field from '#/components/Field';
import perPageItemsValue from '#/config/perPageItemsValue';
// import { mdiMagnify } from '@mdi/js';
// import Icon from '@mdi/react';
import React from 'react';

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
        {/* <Icon path={mdiMagnify} title="Search" size={1.5} color="black" /> */}
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
