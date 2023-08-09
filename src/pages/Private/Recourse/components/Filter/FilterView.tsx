import Combobox from '@/components/Combobox';
import Field from '@/components/Field';
import perPageItemsValue from '@/config/perPageItemsValue';
import React from 'react';
import { type FilterData } from './FilterContainer';
import SearchTag from '../SelectorTag/SearchTag';

interface Props {
  handleChangeSearchName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSearchType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeSearchStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeRecordsPerPage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  searchName: string;
  searchType: number;
  searchStatus: number;
  recoursePerPage: string | number | readonly string[] | undefined;
  dataFilterType: FilterData[];
  dataFilterStatus: FilterData[];
}

const FilterView: React.FC<Props> = ({
  handleChangeSearchName,
  handleChangeSearchType,
  handleChangeSearchStatus,
  handleChangeRecordsPerPage,
  searchName,
  searchStatus,
  searchType,
  recoursePerPage,
  dataFilterStatus,
  dataFilterType
}) => {
  return (
    <div className="shadow-2xl p-4 rounded-xl flex flex-col gap-6 mb-16">
      <p>Filtros</p>
      <div className="flex justify-between items-center gap-12">
        <div className="basis-1/4 items-end">
          <Field
            type="text"
            label="Nombre"
            name="nombre"
            value={searchName}
            handleChange={handleChangeSearchName}
            classBox=""
            errorInput={null}
          />
        </div>
        <div className="basis-1/4 items-end">
          <Combobox
            name="tipo"
            label="Tipo"
            options={dataFilterType}
            filter={true}
            value={searchType}
            handleChange={handleChangeSearchType}
            classBox=""
            errorCombo={null}
          />
        </div>
        <div className="basis-1/4 items-end">
          <Combobox
            name="estado"
            label="Estado"
            filter={true}
            options={dataFilterStatus}
            value={searchStatus}
            handleChange={handleChangeSearchStatus}
            classBox=""
            errorCombo={null}
          />
        </div>
        {/* //TODO Crear componente para multiselect de etiqueta */}
        {/* <div className='basis-1/4 items-end'> */}
        {/*  <Combobox */}
        {/*    name="etiqueta" */}
        {/*    label="Etiqueta" */}
        {/*    filter={true} */}
        {/*    options={ [ {id: 1, value: "OPCION 1"} ,{id: 2, value: "OPCION 2"} ]} */}
        {/*  /> */}
        {/* </div> */}

        <div className="basis-1/4 items-end">
          <SearchTag />
        </div>
        <div className="basis-1/4 items-end">
          <Combobox
            label="Registros por Pagina"
            name="perPage"
            options={perPageItemsValue}
            value={recoursePerPage}
            filter={false}
            classBox="w-32"
            handleChange={handleChangeRecordsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterView;
