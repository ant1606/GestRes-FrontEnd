/* eslint-disable prettier/prettier */
import Button from '#/components/Button';
import Combobox from '#/components/Combobox';
import Field from '#/components/Field';
import { GLOBAL_TYPES_RECOURSE } from '#/config/globalConstantes';
import { useAppSelector } from '#/hooks/redux';
import { type RootState } from '#/redux/store';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import TimeInput from '../TimeInput';
import SelectorTag from '#/components/SelectorTag/SelectorTag';

interface SelectType {
  id: number;
  value: string;
}

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  typeId: number;
  unitMeasureProgressId: number;
  editorial: string;
  totalPages: number;
  totalVideos: number;
  totalChapters: number;
  author: string;
  totalHours: string;
  source: string;
  recourseError: Record<string, string | null>;
  dataSelectType: SelectType[];
  dataSelectUnitMeasureProgressData: SelectType[];
  isShow: boolean;
  selectedTags: number[];
  setSelectedTags: React.Dispatch<React.SetStateAction<number[]>>;
  recourseSelected: Recourse;
  submitIsDisabled: boolean;
  choicesTagData: Array<{ value: number; label: string }>
  statusIsCulminado: boolean;
}

const FormView: React.FC<Props> = ({
  handleSubmit,
  handleInputChange,
  handleChangeType,
  name,
  typeId,
  unitMeasureProgressId,
  editorial,
  totalPages,
  totalVideos,
  totalChapters,
  author,
  totalHours,
  source,
  recourseError,
  dataSelectType,
  dataSelectUnitMeasureProgressData,
  isShow,
  selectedTags,
  setSelectedTags,
  recourseSelected,
  submitIsDisabled,
  choicesTagData,
  statusIsCulminado
}) => {
  const { settingsType } = useAppSelector((state: RootState) => state.settings);
  const navigate = useNavigate();

  const handleClickCancel = (): void => {
    navigate('/app/recourse');
  };


  if (settingsType === undefined) return <>No se cargaron los datos iniciales</>;
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex w-full my-6">
        <Field
          type="text"
          label="Nombre"
          name="name"
          classBox="w-full"
          handleChange={handleInputChange}
          value={name}
          errorInput={recourseError?.name}
          readonly={isShow}
        />
      </div>
      <div className="flex  my-6">
        <Field
          type="text"
          label="Ruta"
          name="source"
          handleChange={handleInputChange}
          value={source}
          errorInput={recourseError.source}
          classBox="w-full"
          readonly={isShow}
        />
      </div>
      <div className="flex gap-10 my-6">
        <Combobox
          name="typeId"
          label="Tipo"
          options={dataSelectType}
          filter={false}
          classBox="basis-2/4"
          handleChange={handleChangeType}
          value={typeId}
          errorCombo={recourseError?.typeId}
          isDisabled={isShow || statusIsCulminado}
        />
        <Combobox
          name="unitMeasureProgressId"
          label="Unidad de Medida de Progreso"
          options={dataSelectUnitMeasureProgressData}
          filter={false}
          classBox="basis-2/4"
          handleChange={handleChangeType}
          value={unitMeasureProgressId}
          errorCombo={recourseError?.unitMeasureProgressId}
          isDisabled={isShow || statusIsCulminado}
        />

        {/* </div>
      <div className="flex gap-10 my-6"> */}
        {parseInt(typeId.toString()) ===
          settingsType.find((val) => val.key === GLOBAL_TYPES_RECOURSE.RECOURSE_TYPE_LIBRO)?.id ? (
          <>
            <Field
              type="text"
              label="Total Paginas"
              name="totalPages"
              classBox="basis-2/4"
              handleChange={handleInputChange}
              value={totalPages}
              errorInput={recourseError.totalPages}
              readonly={isShow || statusIsCulminado}
            />
            <Field
              type="text"
              label="Total Capitulos"
              name="totalChapters"
              classBox="basis-2/4"
              handleChange={handleInputChange}
              value={totalChapters}
              errorInput={recourseError.totalChapters}
              readonly={isShow || statusIsCulminado}
            />
          </>
        ) : (
          <>
            <Field
              type="text"
              label="Total Videos"
              name="totalVideos"
              classBox="basis-2/4"
              handleChange={handleInputChange}
              value={totalVideos}
              errorInput={recourseError.totalVideos}
              readonly={isShow || statusIsCulminado}
            />
            <TimeInput
              handleChange={handleInputChange}
              timeValue={totalHours}
              name="totalHours"
              outInputFocus="author"
              label="Total Horas"
              classBox="basis-2/4"
              errorInput={recourseError.totalHours}
              readonly={isShow || statusIsCulminado}
            />
          </>
        )}

      </div>
      <div className="flex gap-10 my-6">
        <Field
          type="text"
          label="Autor"
          name="author"
          classBox="basis-2/4"
          handleChange={handleInputChange}
          value={author}
          errorInput={recourseError.author}
          readonly={isShow}
        />

        <Field
          type="text"
          label="Editorial"
          name="editorial"
          classBox="basis-2/4"
          handleChange={handleInputChange}
          value={editorial}
          errorInput={recourseError?.editorial}
          readonly={isShow}
        />
      </div>
      <div className="mt-5 mb-20">
        {!isShow ? (
          <SelectorTag setSelectValues={setSelectedTags} selectedTags={selectedTags} choicesData={choicesTagData} />
        ) : (
          <div className="flex flex-1 justify-start items-start flex-wrap gap-2 leading-1">
            {recourseSelected?.tags.map((tag) => (
              <div
                key={tag.id}
                className={`${tag.style} m-0 h-7 shrink px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase`}>
                {tag.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {!isShow ? (
        <div className="flex justify-around gap-20">
          <Button type="submit" text="Registrar" btnType="main" isDisabled={submitIsDisabled} />
          <Button btnType="danger" text="Cancelar" type="button" onClick={handleClickCancel} />
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

export default FormView;
